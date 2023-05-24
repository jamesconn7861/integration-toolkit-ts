<script lang="ts">
import { defineComponent, ref } from 'vue';
import NavItem from './NavItem.vue';

export default defineComponent({
  setup() {
    const navContainer = ref<HTMLDivElement>();
    const navToggle = ref<HTMLButtonElement>();
    const navToggleIcon = ref<HTMLImageElement>();

    return { navContainer, navToggle, navToggleIcon };
  },
  emits: ['updateOverlay', 'updateComponent'],
  components: {
    NavItem,
  },
  methods: {
    handleMenuState() {
      this.navContainer?.classList.toggle('open');
      if (this.navContainer?.classList.contains('open')) {
        this.navToggleIcon?.classList.replace('bx-menu', 'bx-menu-alt-right');
        this.$emit('updateOverlay', true);
      } else {
        this.navToggleIcon?.classList.replace('bx-menu-alt-right', 'bx-menu');
        this.$emit('updateOverlay', false);
      }
    },
    handleComponentChange(newComponent: string) {
      if (this.navContainer?.classList.contains('open')) this.handleMenuState();
      this.$emit('updateComponent', newComponent);
    },
  },
});
</script>

<template>
  <div class="nav-container" ref="navContainer">
    <button class="nav-button nav-toggle" ref="navToggle" @click="handleMenuState">
      <i class="bx bx-menu" id="nav_toggle_icon" ref="navToggleIcon"></i>
    </button>

    <ul class="nav-list">
      <li class="nav-item">
        <NavItem
          @navigate="handleComponentChange"
          component="LabelsView"
          icon-class="bx bx-barcode nav-item-icon"
          item-text="Labels"
        ></NavItem>
      </li>

      <li class="nav-item">
        <NavItem
          @navigate="handleComponentChange"
          component="VlanView"
          icon-class="bx bxs-network-chart nav-item-icon"
          item-text="Vlan Changer"
        ></NavItem>
      </li>

      <!-- <li class="nav-item">
        <NavItem
          @navigate="handleComponentChange"
          component="OrdersView"
          icon-class="bx bx-package nav-item-icon"
          item-text="Order Tracking"
        ></NavItem>
      </li> -->

      <!-- <li class="nav-item">
        <NavItem
          @navigate="handleComponentChange"
          component="ToolsView"
          icon-class="bx bx-wrench nav-item-icon"
          item-text="Tools"
        ></NavItem>
      </li> -->

      <li class="nav-item">
        <NavItem
          @navigate="handleComponentChange"
          component="FAQView"
          icon-class="bx bx-question-mark nav-item-icon"
          item-text="FAQ"
        ></NavItem>
      </li>
    </ul>

    <div class="nav-item last-item">
      <NavItem
        @navigate="handleComponentChange"
        component="SettingsView"
        icon-class="bx bx-cog nav-item-icon"
        item-text="Settings"
      ></NavItem>
    </div>
  </div>
</template>

<style scoped>
.nav-container {
  display: flex;
  flex-flow: column;
  position: absolute;
  gap: 30px;
  left: 0;
  top: 0;
  height: 100%;
  width: 75px;
  padding: 10px;
  z-index: 999;
  transition: all 0.4s ease-in-out;
  background: var(--color-main-2);
  box-shadow: 4px 0px 5px 0px rgb(0 0 0 / 54%);
}

.nav-container.open {
  width: 200px;
}

.nav-toggle {
  height: 55px;
  width: 55px;
  display: flex;
  cursor: pointer;
  background-color: transparent;
  border: none;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  color: var(--nav-text-color);
}

#nav_toggle_icon {
  font-size: 26px;
  transition: all 0.4s ease;
}

.nav-list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 15px;
  list-style-type: none;
  padding: 0;
  overflow-y: overlay;
  overflow-x: hidden;
}

.nav-item {
  height: 50px;
}
</style>
