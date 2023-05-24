<script lang="ts">
import { defineComponent } from 'vue';
import type { PortStatus } from '@/types';
import VlanChip from './VlanChip.vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'VlanTable',
  props: {
    ports: {
      type: [] as PropType<PortStatus[]>,
      required: true,
    },
  },
  components: {
    VlanChip,
  },
  // data() {
  //   return {
  //     ports: [] as PortStatus[],
  //   };
  // },
  // created() {
  //   const cardStates = ['connected', 'error', 'disconnected'];
  //   for (let x = 1; x <= 48; x++) {
  //     this.ports.push({
  //       id: x,
  //       name: 'Luxottica POS',
  //       vlan: Math.floor(Math.random() * (999 - 100 + 1) + 100),
  //       status: cardStates[Math.floor(Math.random() * cardStates.length)],
  //       notes: 'Use for NUCs, Teleopt PCs and Servers. Do not use for iGels!',
  //       locked: false,
  //     });
  //   }
  // },
});
</script>

<template>
  <div class="vlan-chips-container">
    <VlanChip v-for="port in ports" :header="port.id" :port-info="port" :key="port.id"></VlanChip>
  </div>
</template>

<style scoped>
.vlan-chips-container {
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-auto-flow: column;
  gap: 3px 15px;
  justify-content: center;
  overflow-y: auto;
  width: 90%;
}

@media (max-width: 800px) {
  .vlan-chips-container {
    display: block;
    columns: 2;
    width: fit-content;
  }

  .vlan-chips-container .chip-container {
    margin: 3px 0;
  }
}
</style>
