<script lang="ts">
import { useStore } from '@/stores/store';
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
});
</script>

<template>
  <div class="overlay">
    <div class="modal-container">
      <i class="fa-solid fa-xmark close-modal" @click="closeModal"></i>
      <h1 class="title"><slot name="title-text-slot">Label Settings</slot></h1>
      <div class="info-container">
        <span class="info-item">
          <h2 class="info-header">Notes:</h2>
          <p class="info-value"><slot name="notes"></slot></p>
        </span>
        <span class="info-item">
          <h2 class="info-header">Templates:</h2>
          <p class="info-value"><slot name="paths"></slot></p>
        </span>
      </div>
      <p class="footer">
        For more information on locating and using the label templates, please see the
        <button class="faq-link" @click.prevent="">FAQ</button> section.
      </p>
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
  max-height: 95%;
  max-width: 95%;
  border-radius: 18px;
  position: relative;
  align-items: center;
  padding: 25px;
  overflow-y: auto;
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
  padding: 0.5em;
}

.info-container {
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: 100%;
}

.info-header {
  display: inline-block;
}

.info-item {
  display: flex;
  padding: 1em;
  gap: 0.5em;
  align-items: flex-start;
  line-height: 24px;
}

.info-value {
  display: inline-block;
  text-align: left;
  font-size: 1.1em;
  overflow: auto;
  max-width: 100%;
  line-height: 24px;
}

.faq-link {
  color: var(--color-accent-2);
  background-color: transparent;
  border: none;
  text-decoration: underline;
  border: none;
  padding: 0;
}

.faq-link:hover {
  color: var(--color-accent-1);
  cursor: pointer;
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

@media (max-width: 750px) {
  .info-item {
    flex-direction: column;
  }
}
</style>
