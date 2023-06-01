<script lang="ts">
import { defineComponent, ref } from 'vue';
import NavBar from './components/navigation/NavBar.vue';
import LabelsView from './views/LabelsView.vue';
import ToolsView from './views/ToolsView.vue';
import VlanView from './views/VlanView.vue';
import FAQView from './views/FAQView.vue';
import SettingsView from './views/SettingsView.vue';
import Loading from './components/ui/Loading.vue';
import { useStore } from '@/stores/store';

export default defineComponent({
  components: {
    NavBar,
    LabelsView,
    ToolsView,
    VlanView,
    FAQView,
    SettingsView,
    Loading,
  },
  setup() {
    const navBar = ref();
    return { navBar };
  },
  data() {
    return {
      currentComponent: 'LabelsView' as string,
      navOverlayActive: false as boolean,
    };
  },
  computed: {
    loadingScreenActive() {
      return useStore().loadingScreenActive;
    },
  },
  methods: {
    handleNavOverlay(newState: boolean) {
      this.navOverlayActive = newState;
    },
    updateComponent(newComponent: string) {
      this.currentComponent = newComponent;
    },
  },
});
</script>

<template>
  <Loading v-if="loadingScreenActive" />
  <NavBar
    ref="navBar"
    @update-overlay="handleNavOverlay"
    @update-component="updateComponent"
  ></NavBar>
  <main class="main-content">
    <div
      class="nav-overlay"
      ref="navOverlay"
      @click="
        navOverlayActive = false;
        navBar.handleMenuState();
      "
      :class="{ active: navOverlayActive }"
    ></div>
    <KeepAlive><component :is="currentComponent" /></KeepAlive>
    <!-- <RouterView></RouterView> -->
  </main>
</template>

<style scoped>
.main-content {
  margin-left: 75px;
  width: calc(100% - 75px);
  height: 100%;
  padding: 15px;
}

.nav-overlay {
  width: 100%;
  z-index: 998;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  opacity: 0;
  transition: all 0.5s ease-in-out;
  pointer-events: none;
}

.nav-overlay.active {
  display: block;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.2);
  pointer-events: all;
}
</style>
