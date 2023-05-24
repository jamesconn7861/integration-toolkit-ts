<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/stores/store';
import type { BenchRecord, PortStatus, VlanRecord } from '@/types';
import Dropdown2 from '@/components/ui/Dropdown2.vue';
import VlanTable from '@/components/ui/VlanTable.vue';
import { getBenchStatus, sendChangeReq, validateChangeRequest } from '../utils/VlanChanger.utils';
import type { VlanChangeReq } from '@/types/VlanChangeReq';

export default defineComponent({
  name: 'VlanChanger',
  setup() {
    const collator = new Intl.Collator('en', {
      numeric: true,
      sensitivity: 'base',
    });

    const benches = useStore()
      .benchSchema.map((bench: BenchRecord) => {
        return bench.id;
      })
      .sort((a, b) => collator.compare(a, b));

    const vlans = useStore()
      .vlanSchema.map((vlan: VlanRecord) => {
        return `${vlan.name} (${vlan.id}) `;
      })
      .sort();

    return { benches, vlans };
  },
  components: {
    Dropdown2,
    VlanTable,
  },
  data() {
    return {
      portRange: [] as string[],
      portData: [] as PortStatus[],
      benchInput: null as HTMLInputElement | null,
      vlanInput: null as HTMLInputElement | null,
      sPortInput: null as HTMLInputElement | null,
      ePortInput: null as HTMLInputElement | null,
    };
  },
  methods: {
    updatePortRange(benchId: string) {
      const benchRange = useStore().benchSchema.find((bench) => bench.id == benchId)?.range;
      const start = benchRange?.split('-')[0];
      const end = benchRange?.split('-')[1];

      if (!start || !end) return;

      this.portRange = [];
      for (let x = parseInt(start); x <= parseInt(end); x++) {
        this.portRange.push(x.toString());
      }
    },
    async handleBenchStatus() {
      const selectedBench = this.benchInput?.value;

      if (!selectedBench) {
        useStore().showTempMsg({ msg: 'Invalid bench selection.', closeTime: 5000 });
        return;
      }

      const status = await getBenchStatus(selectedBench);

      if (typeof status != 'string') {
        this.portData = [];
        this.portData.push(...status);
      } else {
        useStore().showTempMsg({ msg: `Request failed. Error message: ${status}` });
      }
    },
    async handleVlanChange() {
      if (!this.benchInput || !this.vlanInput || !this.sPortInput || !this.ePortInput) return;
      const selectedVlan = useStore().vlanSchema.find(
        (vlanRecord: VlanRecord) => vlanRecord.name == this.vlanInput?.value.split('(')[0].trim()
      );

      if (!selectedVlan) return;
      const payload: VlanChangeReq = {
        user: useStore().appSettings.user,
        benchId: this.benchInput.value,
        vlan: selectedVlan.id,
        ports: [+this.sPortInput.value, +this.ePortInput.value],
      };

      await validateChangeRequest(payload).then(async (res) => {
        if (res) {
          await sendChangeReq(payload);
        }
      });
    },
  },
  mounted() {
    this.benchInput = document.querySelector('#benchInput');
    this.vlanInput = document.querySelector('#vlanInput');
    this.sPortInput = document.querySelector('#sPortInput');
    this.ePortInput = document.querySelector('#ePortInput');
  },
});
</script>

<template>
  <div class="vlan-changer-container">
    <div class="vlan-options-container">
      <div class="dd-container">
        <Dropdown2
          :input-id="'benchInput'"
          :items="benches"
          :placeholder="'Bench'"
          @item-selected="updatePortRange"
        ></Dropdown2>
      </div>
      <div class="dd-container">
        <Dropdown2
          :input-id="'vlanInput'"
          :items="vlans"
          :placeholder="'Vlan'"
          @item-selected=""
        ></Dropdown2>
      </div>
      <div class="dd-container">
        <Dropdown2
          :input-id="'sPortInput'"
          :items="portRange"
          :placeholder="'Start Port'"
          @item-selected="updatePortRange"
        ></Dropdown2>
      </div>
      <div class="dd-container">
        <Dropdown2
          :input-id="'ePortInput'"
          :items="portRange"
          :placeholder="'End Port'"
          @item-selected="updatePortRange"
        ></Dropdown2>
      </div>
    </div>
    <VlanTable :ports="portData"></VlanTable>
    <div class="vlan-controls">
      <button class="control-buttons" id="changeVlans" @click="handleVlanChange">
        Change Vlans
      </button>
      <button class="control-buttons" id="checkVlans" @click="handleBenchStatus">
        Check Vlans
      </button>
    </div>
  </div>
</template>

<style scoped>
.vlan-changer-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
}
.vlan-options-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 25px;
  flex-grow: 0;
}

.dd-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

#benchSelect {
  width: 150px;
}

#spSelect,
#epSelect {
  width: 150px;
}

.vlan-table-container {
  display: flex;
  height: 100%;
}

.vlan-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px;
  gap: 1.5em;
}

.control-buttons {
  display: inline-block;
  padding: 0.35em 1.2em;
  border: none;
  text-align: center;
  transition: all 0.2s;
  font-size: 1em;
  min-width: 200px;
  min-height: 50px;
  border-radius: 2em;
  box-shadow: 2px 4px 5px 0px rgb(0 0 0 / 54%);
  transition: all 0.1s ease-in-out;
}

.control-buttons:hover {
  cursor: pointer;
}

#changeVlans {
  color: var(--color-text);
  background-color: var(--color-main-2);
}

#checkVlans {
  color: var(--color-text);
  background-color: #47b46f;
}

#changeVlans:hover {
  background-color: var(--color-accent-1);
}

#checkVlans:hover {
  background-color: #4ecb7c;
}

@media (max-width: 735px) {
  .vlan-controls {
    flex-direction: column;
  }

  .control-buttons {
    padding: 0.15em 0.5em;
    min-width: 165px;
  }
}
</style>
