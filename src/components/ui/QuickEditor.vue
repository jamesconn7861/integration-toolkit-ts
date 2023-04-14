<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<template>
  <div class="quick-edit-menu" ref="quickEditMenu">
    <h2 class="menu-title">Quick Edit Menu</h2>
    <div class="editor-list">
      <div class="editor-item">
        <label>Add Prefix</label>
        <input />
      </div>
      <div class="editor-item">
        <label>Add Suffix</label>
        <input />
      </div>
    </div>
    <button class="apply-edits">Apply</button>
  </div>
</template>

<style scoped>
.quick-edit-menu {
  flex-grow: 1;
  max-height: 98%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  background-color: var(--color-main-2);
  width: fit-content;
  padding: 1em;
  min-width: 300px;
  border-radius: 5px;
  opacity: 0.5;
  transition: 0.5s all;
}

.quick-edit-menu:hover {
  opacity: 1;
}

.menu-title {
  margin-bottom: 1em;
}

.editor-list {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}

.editor-item {
  display: flex;
  flex-direction: row;
  gap: 1em;
}

.apply-edits {
  display: inline-block;
  padding: 0.35em 1.2em;
  border: none;
  text-align: center;
  transition: all 0.2s;
  font-size: 1em;
  min-width: 100px;
  min-height: 40px;
  border-radius: 2em;
  box-shadow: 2px 4px 5px 0px rgb(0 0 0 / 54%);
  transition: all 0.1s ease-in-out;
  align-self: center;
  background-color: var(--color-accent-2);
  color: var(--color-text);
}

.apply-edits:hover {
  cursor: pointer;
  background-color: var(--color-accent-1);
}
</style>
