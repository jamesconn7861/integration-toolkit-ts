<script lang="ts">
import { useStore } from '@/stores/store';
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    showCountState: {
      get() {
        return useStore().appSettings.showCellCount;
      },
      set(value: boolean) {
        useStore().updateSetting('showCellCount', value);
      },
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    confirmAction() {
      this.$emit('confirm');
    },
  },
});
</script>

<template>
  <div class="overlay">
    <div class="modal-container">
      <i class="fa-solid fa-xmark close-modal" @click="closeModal"></i>
      <h1 class="title"><slot name="title-text-slot">Label Settings</slot></h1>
      <div class="settings-container">
        <div class="setting-item">
          <label class="switch">
            <input type="checkbox" ref="cellCounter" v-model="showCountState" />
            <span class="slider"></span>
          </label>
          <h3>Show cell counter</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: calc(100% - 75px);
  position: absolute;
  top: 0;
  left: 75px;
  background: #00000064;
  backdrop-filter: blur(10px);
  z-index: 997;
}

.modal-container {
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  background: var(--color-main-1);
  max-height: 50%;
  max-width: 90%;
  border-radius: 18px;
  position: relative;
  align-items: center;
  padding: 25px;
}

.close-modal {
  color: var(--color-text-2);
  font-size: 2rem;
  position: absolute;
  right: 20px;
  top: 15px;
}

.close-modal:hover {
  color: rgb(254, 125, 125);
  cursor: pointer;
}

.title {
  font-size: 1.3rem;
  margin: 0 0 15px 0;
}

.settings-container {
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: 100%;
}

.setting-item {
  display: flex;
  flex-direction: row;
  padding: 1em;
  align-items: center;
  gap: 1em;
}

.buttons-container {
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  gap: 50px;
}

.modal-buttons {
  width: 10vw;
  min-width: 100px;
  max-width: 200px;
  height: 45px;
  border-radius: 26px;
  border: none;
  color: var(--color-text);
  font-weight: 700;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.modal-buttons:hover {
  cursor: pointer;
  opacity: 0.9;
}

#cancel-action {
  background: var(--color-accent-1);
}

#commit-action {
  background: var(--color-accent-2);
}

@media (max-width: 440px) {
  .setting-item {
    flex-direction: column;
  }
}
</style>
