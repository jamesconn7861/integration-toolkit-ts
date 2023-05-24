<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { PortStatus } from '@/types';

export default defineComponent({
  name: 'VlanChip',
  props: {
    header: {
      type: Number,
      required: true,
    },
    portInfo: {
      type: Object as PropType<PortStatus>,
      required: true,
    },
  },
  methods: {
    handlePopup(e: MouseEvent) {
      document.querySelectorAll('.active').forEach((chip) => {
        if (chip !== e.currentTarget) {
          chip.classList.remove('active');
        }
      });
      (e.currentTarget as HTMLDivElement).classList.toggle('active');
    },
    handleToolTip(e: MouseEvent) {
      const chipContainer = document.querySelector('.vlan-chips-container') as HTMLDivElement;
      const tooltipParent = e.currentTarget as HTMLDivElement;
      const tooltip = tooltipParent.querySelector('.chip-info') as HTMLDivElement;
      const containerBottom = chipContainer.getBoundingClientRect().bottom;
      const containerRight = chipContainer.getBoundingClientRect().right;

      // Get calculated ktooltip coordinates and size
      const tooltipParentArea = tooltipParent.getBoundingClientRect();

      let tipX = tooltipParentArea.width + 5; // 5px on the right of the ktooltip
      let tipY = 0; // 40px on the top of the ktooltip
      // Position tooltip
      tooltip.style.top = tipY + 'px';
      tooltip.style.left = tipX + 'px';

      // Get calculated tooltip coordinates and size
      var tooltip_rect = tooltip.getBoundingClientRect();
      // Corrections if out of window
      if (tooltipParentArea.right + tooltip_rect.width > containerRight)
        // Out on the right
        tipX = -tooltip_rect.width - 5; // Simulate a "right: tipX" position
      if (tooltipParentArea.top + tooltip_rect.height > containerBottom)
        // Out on the top
        tipY = 0 - tooltip_rect.height; // Align on the top

      // Apply corrected position
      tooltip.style.top = tipY + 'px';
      tooltip.style.left = tipX + 'px';
    },
  },
});
</script>

<template>
  <div :class="['chip-container', portInfo.status]" @click="handlePopup" @mouseover="handleToolTip">
    <h4 class="chip-header">{{ header }}</h4>
    <span>{{ portInfo.vlan }}</span>
    <div
      class="chip-info"
      tabindex="0"
      :on-blur="(e) => {(e.currentTarget as HTMLDivElement).classList.remove('active')}"
    >
      <div class="chip-field">
        <p><strong>Name:</strong> {{ portInfo.name }}</p>
      </div>
      <div class="chip-field">
        <p><strong>Number:</strong> {{ portInfo.vlan }}</p>
      </div>
      <div class="chip-field">
        <p><strong>Status:</strong> {{ portInfo.status }}</p>
      </div>
      <div class="chip-field" v-if="portInfo.locked">
        <p><strong>Locked:</strong> {{ portInfo.locked }}</p>
      </div>
      <div class="chip-field" v-if="portInfo.description != '--'">
        <p><strong>Description:</strong> {{ portInfo.description }}</p>
      </div>
      <!-- <div class="chip-field">
        <p><strong>Vlan Notes:</strong> {{ portInfo.notes }}</p>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.chip-container {
  display: flex;
  border-radius: 20px;
  font-family: inherit;
  margin: auto;
  width: 150px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: relative;
  flex-grow: 0;
  padding-right: 15px;
  background: #ff7b7b;
}

.chip-container:hover > .chip-info {
  opacity: 1;
  display: flex;
}

.chip-container > span {
  pointer-events: none;
  font-weight: 800;
  flex-grow: 1;
  text-align: center;
  color: rgb(10, 38, 71);
}

.chip-container.Disconnected {
  background: rgba(237, 237, 237, 0.762);
}

.chip-container.Disconnected > span {
  color: rgb(10, 38, 71);
}

.chip-container.Connected {
  background: #56d95fdf;
}

.chip-container.Connected > span {
  color: rgb(10, 38, 71);
}

.chip-header {
  display: flex;
  float: left;
  /* background: rgb(20, 66, 114); */
  color: white;
  width: 40px;
  height: 80%;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 0px;
  pointer-events: none;
  /* text-align: right; */
  box-shadow: 6px 6px 18px -4px rgba(0, 0, 0, 0.5);
}

.chip-container,
.chip-header {
  height: 40px;
  line-height: 1.5;
}

.chip-container.active {
  border: 2px solid green;
}

.chip-container.active > .chip-info {
  opacity: 1;
  display: flex;
}

/* .chip-container:hover > .chip-info {
  opacity: 1;
} */

.chip-info {
  position: absolute;
  opacity: 0;
  height: fit-content;
  flex-direction: column;
  width: auto;
  max-width: 200px;
  min-width: 200px;
  background: rgba(0, 200, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 12px;
  top: -999px;
  left: -999px;
  /* transform: translate(-35px, -35px); */
  padding: 15px;
  /* transition: all 0.3s ease; */
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  pointer-events: none;
  z-index: 200;
  display: none;
}

.chip-field {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.chip-field * {
  margin: 0;
  line-height: 1.5;
}

.vlan-field {
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 475px) {
  .chip-container {
    width: 75px;
    height: 35px;
    padding: 0px;
  }

  .chip-header {
    height: 35px;
    width: 35px;
  }

  .chip-info {
    transform: translate(-35px, -35px);
  }
}

/* @media (hover: hover) {
  .chip-container:hover > .chip-info {
    opacity: 1;
  }
} */
</style>
