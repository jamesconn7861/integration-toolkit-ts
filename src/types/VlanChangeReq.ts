export interface VlanChangeReq {
    user: string;
    ports: number[];
    vlan: number;
    benchId: string;
}