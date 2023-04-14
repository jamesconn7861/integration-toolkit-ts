<script lang="ts">
import { defineComponent } from 'vue';
import ToolCard from '@/components/cards/ToolCard.vue';
import type { ToolInfo } from '@/types';

export default defineComponent({
  setup() {
    const tools: ToolInfo[] = [
      {
        name: 'Personality Automation',
        description: 'Automation tools for the Luxottica Personality server.',
        client: 'Luxottica',
        type: 'Automation',
      },
      {
        name: 'Scan Sheet Generator',
        description: 'Generates scan sheets for TSC stores.',
        client: 'Tractor Supply Co.',
        type: 'Miscellaneous',
      },
    ];
    return { tools };
  },
  components: { ToolCard },
});
</script>

<template>
  <div class="tools-container">
    <ToolCard v-for="(tool, index) in tools" :tool="tool" index="index" key="tool.name" />
  </div>
</template>

<style scoped>
.tools-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
