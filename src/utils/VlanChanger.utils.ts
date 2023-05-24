import { useStore } from "@/stores/store";
import type { BenchRecord, PortData, PortStatus, VlanRecord } from "@/types";
import type { VlanChangeReq } from "@/types/VlanChangeReq";
import type { AxiosError } from "axios";

async function getBenchStatus(benchId: string): Promise<string | PortStatus[]> {
  let result: string | PortStatus[] = [];
  await useStore()
  .axiosInst.get(`vlan-changer/${benchId}`, {
    timeout: 60000,
  })
  .then((res) => {
    const statusArray: PortStatus[] = [];
    const lockedPorts = useStore().benchSchema.find((benchRecord) => benchRecord.id == benchId)?.locked;
    const lockedPortsArray = lockedPorts?.split(',') || [];
    res.data.forEach((portItem: PortData) => {

      const vlanNumber = parseInt(portItem.vlan);
      const vlanRecord = useStore().vlanSchema.find((vlan) => vlan.id == vlanNumber);
      const vlanName = vlanRecord?.name || 'Unknown';
      const vlanNotes = vlanRecord?.notes || '';
      const portLock = lockedPortsArray.includes(portItem.port.toString());
      let portStatus: string = '';
      if (portItem.status == 'connected') {
        portStatus = "Connected"
      } else if (portItem.status == 'notconnec') {
        portStatus = "Disconnected"
      } else {
        portStatus = `Error: ${portItem.status}`
      }

      statusArray.push({
        id: portItem.port,
        name: vlanName,
        vlan: vlanNumber,
        status: portStatus,
        notes: vlanNotes,
        description: portItem.description,
        locked: portLock,
      });

    });
    result = statusArray;
  })
  .catch((err: AxiosError) => {
    result = err.message
  })

  return result;
}

async function validateChangeRequest(reqParams: VlanChangeReq): Promise<boolean | string> {
  return new Promise((resolve, reject) => {
  // Check for valid vlan
  if (!useStore().vlanSchema.find((vlanRecord: VlanRecord) => vlanRecord.id == reqParams.vlan)) {
    useStore().showTempMsg({
      msg: `Invalid vlan selection. Vlan "${reqParams.vlan}" does not exist.`,
      closeTime: 5000
    });
    reject(false);
    return;
  }

  // Check for valid bench id
  const selectedBench = useStore().benchSchema.find((benchRecord: BenchRecord) => benchRecord.id == reqParams.benchId);
  if (!selectedBench) {
    useStore().showTempMsg({
      msg: `Invalid bench selection. Bench "${reqParams.benchId}" does not exist.`,
      closeTime: 5000
    });
    reject(false);
    return;
  }
  
    // Check for valid range
    const benchRange = selectedBench.range.split('-');
    if ((reqParams.ports[0] < +benchRange[0] || reqParams.ports[1] > +benchRange[1]) || (reqParams.ports[1] < +benchRange[0] || reqParams.ports[1] > +benchRange[1])) {
      useStore().showTempMsg({
        msg: `Invalid port selection. Port selection is outside of bench port range.`,
        closeTime: 5000
      });
      reject(false);
      return;
    }

    // Check that starting port isn't greater than ending port.
    if (reqParams.ports[0] > reqParams.ports[1]) {
      useStore().showTempMsg({
        msg: `Invalid port selection. Starting port can't be greater than the ending port.`, 
        closeTime: 500
      })
      reject(false)
      return;
    }

    resolve(true);
  })
}

async function sendChangeReq(reqParams: VlanChangeReq): Promise<boolean> {
    useStore().axiosInst.post('/vlan-changer/change', reqParams, {timeout: 60000})
    .then((res) => {
      useStore().showTempMsg({
        msg: res.data['stdOut'],
        closeTime: 5000
      })
      return true;
    })
    .catch(() => {
      useStore().showTempMsg({
        msg: 'Unable to change vlans at this time. Please try again later.',
        closeTime: 5000
      })
      return false;
    })
    return false;
}

export { getBenchStatus, validateChangeRequest, sendChangeReq}