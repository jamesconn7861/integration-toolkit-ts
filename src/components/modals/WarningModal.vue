<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
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
      <h1 class="title"><slot name="title-text-slot">Delete Item?</slot></h1>
      <p class="description">
        <slot name="description-text-slot"
          >Are you sure you want to delete this item?<br />You can't undo this action.</slot
        >
      </p>
      <div class="warning-container">
        <span class="warning-header">
          <i class="fa-solid fa-triangle-exclamation warning-icon"></i>
          <h1 class="warning-header-text">Warning</h1>
        </span>
        <p class="warning-text">
          <slot name="warning-text-slot"
            >This will instantly push changes to clients. Please review changes before
            committing.</slot
          >
        </p>
      </div>
      <span class="buttons-container">
        <button class="modal-buttons" id="cancel-action" @click="closeModal">Cancel</button>
        <button class="modal-buttons" id="commit-action" @click="confirmAction">
          <p>Delete Item <i class="fa-solid fa-trash trash-icon"></i></p>
        </button>
      </span>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #00000064;
  backdrop-filter: blur(10px);
  z-index: 997;
}

.modal-container {
  color: #1f1f1f;
  display: flex;
  flex-direction: column;
  background: #fff;
  height: 350px;
  width: 550px;
  border-radius: 18px;
  position: relative;
  align-items: center;
  padding: 25px;
}

.close-modal {
  color: #a7a7a7;
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

.description {
  text-align: center;
  margin: 0;
  font-weight: 400;
  white-space: pre-line;
}

.warning-container {
  background: #ffe9da;
  width: 80%;
  max-height: 40%;
}

.warning-container {
  position: relative;
  border-radius: 5px;
  border-left: 5px solid #f47044;
  padding: 5px 5px 5px 5px;
  margin: auto;
}

.warning-header-text {
  font-size: 1rem;
  color: #862e25;
  margin: 10px 0 8px 0;
}

.warning-text {
  margin: 8px 0 10px 0;
  color: #9e2810;
}

.warning-icon {
  font-size: 1.2rem;
  position: absolute;
  left: 16px;
  top: 18px;
  color: var(--color-warning-1);
}

.buttons-container {
  margin-top: auto;
  display: flex;
  flex-direction: row;
  gap: 50px;
}

.trash-icon {
  margin-left: 5px;
}

.modal-buttons {
  width: 175px;
  height: 45px;
  border-radius: 26px;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.modal-buttons:hover {
  cursor: pointer;
  opacity: 0.9;
}

#cancel-action {
  background: #627c97;
}

#commit-action {
  background: #e1283a;
}
</style>
