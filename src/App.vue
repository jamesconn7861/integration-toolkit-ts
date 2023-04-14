<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/navigation/NavBar.vue';
import LabelsView from './views/LabelsView.vue';
import ToolsView from './views/ToolsView.vue';

export default defineComponent({
  components: {
    NavBar,
    LabelsView,
    ToolsView,
  },
  data() {
    return {
      currentComponent: 'LabelsView' as string,
      navOverlayActive: false as boolean,
    };
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
  <NavBar @update-overlay="handleNavOverlay" @update-component="updateComponent"></NavBar>
  <main class="main-content">
    <div class="nav-overlay" ref="navOverlay" :class="{ active: navOverlayActive }"></div>
    <KeepAlive><component :is="currentComponent" /></KeepAlive>
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
}

.nav-overlay.active {
  display: block;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
