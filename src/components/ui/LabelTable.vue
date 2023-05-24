<template>
  <HotTable ref="hotTable" :settings="baseSettings"></HotTable>
</template>

<script lang="ts">
import type Handsontable from 'handsontable';

import { defineComponent, ref, type PropType } from 'vue';
import { HotTable } from '@handsontable/vue3';
import { registerAllModules } from 'handsontable/registry';
import { getDefaultTableSettings, deepFlat } from '@/utils/HotTable.utils';
import { useStore } from '@/stores/store';

import 'handsontable/dist/handsontable.full.css';

// register Handsontable's modules
registerAllModules();

export default defineComponent({
  props: {
    tableSettings: {
      type: Object as PropType<Handsontable.GridSettings>,
      required: true,
    },
  },
  emits: ['updateCellCount'],
  setup(props) {
    const baseSettings = { ...props.tableSettings, ...getDefaultTableSettings() };
    const hotTable = ref<typeof HotTable | null>(null);

    return { hotTable, baseSettings };
  },
  components: {
    HotTable,
  },
  watch: {
    tableSettings: function (newVal, _oldVal) {
      this.hotTable?.hotInstance.updateSettings(newVal);
    },
  },
  methods: {
    calcCellCount: async function () {
      if (!useStore().appSettings.showCellCount) return;

      const selected = this.hotTable?.hotInstance.getSelected();
      if (!selected) return;

      const data = selected.map((r: any) => this.hotTable?.hotInstance.getData(...r));
      if (!data) return;

      const nonBlank = data[0] ? deepFlat(data[0]).filter((v) => v != null && v != '') : [];
      this.$emit('updateCellCount', nonBlank.length);
    },
    clearTable() {
      this.hotTable?.hotInstance.updateData([]);
    },
    getData(): any[] | undefined {
      return this.hotTable?.hotInstance.getData();
    },
  },
  mounted() {
    this.hotTable?.hotInstance.addHook('afterSelectionEnd', this.calcCellCount);
  },
});
</script>

<style>
.handsontable .wtHider {
  margin: auto !important;
}

.handsontable {
  font-family: inherit !important;
  font-size: 1em;
}

@media (max-width: 500px) {
  .handsontable {
    font-size: 0.9em;
  }
}
</style>
