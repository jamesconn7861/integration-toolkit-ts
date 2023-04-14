<script lang="ts">
import type { ToolInfo } from '@/types';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    tool: {
      type: Object as PropType<ToolInfo>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="card">
    <h3>{{ tool.name }}</h3>
    <p>{{ tool.description }}</p>
    <div class="card-field">
      <p>Client:</p>
      <p>{{ tool.client }}</p>
    </div>
    <div class="card-field">
      <p>Type:</p>
      <p>{{ tool.type }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  color: black;
  border-radius: 10px;
  border-color: transparent;
  filter: drop-shadow(0 5px 10px 0 #414141);
  width: 400px;
  height: 180px;
  background-color: #ffffff;
  padding: 20px;
  position: relative;
  z-index: 0;
  overflow: hidden;
  transition: 0.3s ease-in;
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.card::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: -15px;
  right: -15px;
  background: var(--color-main-2);
  height: 220px;
  width: 25px;
  border-radius: 32px;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform 0.3s ease-out;
}

.card:hover::before {
  /* transition-delay: 0.2s; */

  transform: scale(40);
}

.card:hover {
  color: #ffffff;
}

.card p {
  padding: 10px 0;
}

.card-field {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
</style>
