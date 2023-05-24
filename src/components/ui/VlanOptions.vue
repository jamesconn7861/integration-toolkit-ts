<script lang="ts">
import { defineComponent } from 'vue';
import Dropdown from '@/components/ui/Dropdown.vue';
import { useStore } from '@/stores/store';
import type { BenchRecord, VlanRecord } from '@/types';

export default defineComponent({
  name: 'VlanChanger',
  components: {
    Dropdown,
  },
  data() {
    return {
      vlans: useStore()
        .vlanSchema.map((vlan: VlanRecord) => {
          return vlan.name;
        })
        .sort(),
      benches: useStore()
        .benchSchema.map((bench: BenchRecord) => {
          return bench.id;
        })
        .sort(),
      portRange: [] as string[],
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
  },
});
</script>

<template>
  <span class="vlan-changer-container">
    <div class="vlan-menu-container">
      <div id="benchContainer" class="select-container">
        <div class="select-input-container">
          <input
            id="selectedBench"
            ref="selectedBench"
            type="text"
            class="selected-item"
            placeholder="Bench"
            onfocus="this.blur();"
          />
        </div>
        <div id="benchOptions" class="option-container"></div>
      </div>
      <div id="vlanContainer" class="select-container">
        <div class="select-input-container">
          <input
            id="selectedVlan"
            ref="selectedVlan"
            type="text"
            class="selected-item"
            placeholder="Vlan"
            onfocus="this.blur();"
          />
        </div>
        <div id="vlanOptions" class="option-container"></div>
        <i class="bx bx-info-circle" id="vlan-info" @click="showVlanInfo"></i>
      </div>
      <span id="portOptions">
        <div id="startPort" class="select-container">
          <div class="select-input-container">
            <input
              id="selectedStartPort"
              ref="selectedStartPort"
              type="text"
              class="selected-item"
              placeholder="Start Port"
              onfocus="this.blur();"
            />
          </div>
          <div id="startPortOptions" class="option-container"></div>
        </div>
        <div id="endPort" class="select-container">
          <div class="select-input-container">
            <input
              id="selectedEndPort"
              ref="selectedEndPort"
              type="text"
              class="selected-item"
              placeholder="End Port"
              onfocus="this.blur();"
            />
          </div>
          <div id="endPortOptions" class="option-container"></div>
        </div>
      </span>
      <span class="buttonContainer">
        <button id="checkVlan" class="interactionButtons" @click="checkVlansHandler">
          Check Vlans
        </button>
        <button id="changeVlan" class="interactionButtons" @click="changeVlansHandler">
          Change Vlans
        </button>
      </span>
    </div>
  </span>
</template>
