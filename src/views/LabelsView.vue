<script lang="ts">
import type { TableRecord } from '@/types';
import type Handsontable from 'handsontable';

import dropdownVue from '@/components/ui/Dropdown.vue';
import { useStore } from '@/stores/store';
import { defineComponent, reactive, ref } from 'vue';
import LabelTable from '@/components/ui/LabelTable.vue';
import { buildColumns } from '@/utils/HotTable.utils';
import { getUserLabels, uploadLabels } from '@/utils/labels.utils';
import LabelSettings from '@/components/modals/LabelSettings.vue';
import LabelInfoModal from '@/components/modals/LabelInfoModal.vue';
import QuickEditor from '@/components/ui/QuickEditor.vue';

export default defineComponent({
  setup() {
    const tableNames = useStore().tableSchema.map((table: TableRecord) => table.displayName);
    const tableSettings = reactive<Handsontable.GridSettings>({}) as Handsontable.GridSettings;
    const labelTable = ref();

    return { tableNames, labelTable, tableSettings };
  },
  components: { dropdownVue, LabelTable, LabelSettings, LabelInfoModal, QuickEditor },
  computed: {
    showCellCounter() {
      return useStore().appSettings.showCellCount;
    },
  },
  data() {
    return {
      label: undefined as TableRecord | undefined,
      showSettings: false,
      showInfo: false,
      counter: 0,
    };
  },
  methods: {
    updateSettings() {},
    async updateSelection(selectedTable: string) {
      const tableRecord = useStore().tableSchema.find((t) => t.displayName == selectedTable);
      if (!tableRecord) return;

      const res = await Promise.all([
        getUserLabels(tableRecord.id, useStore().appSettings.user),
        buildColumns(tableRecord),
      ]);
      this.tableSettings = {
        data: res[0],
        ...res[1],
      };
      this.label = tableRecord;
    },
    updateTotal(total: number) {
      this.counter = total;
    },
    submitLabels() {
      if (!this.label || !useStore().user) return;
      this.labelTable.hotTable?.hotInstance.validateCells((valid: any) => {
        if (!valid) {
          useStore().showTempMsg({
            msg: 'Invalid cells detected. Please correct the invalid cells and try again.',
            closeTime: 5000,
          });
          return;
        }
      });
      uploadLabels({
        rows: this.labelTable.getData(),
        columns: this.label?.columns.map((col) => col.id),
        table: this.label?.id,
        user: useStore().user || '',
      });
    },
  },
  deactivated() {
    this.showSettings = false;
  },
});
</script>

<template>
  <div class="labels-container">
    <Transition>
      <LabelSettings v-if="showSettings" @close="showSettings = false"></LabelSettings>
    </Transition>
    <Transition>
      <LabelInfoModal v-if="showInfo" @close="showInfo = false">
        <template #title-text-slot>{{ label?.displayName }}</template>
        <template #notes>{{ label?.notes }}</template>
        <template #paths>{{ label?.paths.join(', ') }}</template>
      </LabelInfoModal>
    </Transition>
    <div id="label_type_container">
      <i class="bx bx-cog" id="local_settings" @click="showSettings = true"></i>
      <dropdownVue
        :items="tableNames"
        :placeholder="'Label Type'"
        @item-selected="updateSelection"
      ></dropdownVue>
      <i class="bx bx-info-circle" id="label_info" @click="showInfo = true" v-if="label"></i>
    </div>
    <div id="tablecontainer" ref="tableContainer">
      <LabelTable
        @update-cell-count="updateTotal"
        :table-settings="tableSettings"
        v-if="label"
        ref="labelTable"
      ></LabelTable>
    </div>
    <span class="label-button-container">
      <button id="clear_table" class="table-buttons" @click="labelTable.clearTable">
        Clear Table
      </button>
      <button id="update_labels" class="table-buttons" @click="submitLabels">
        Upload / Update Table
      </button>
      <button id="add_orders" class="table-buttons" v-if="label?.displayName == 'Order Numbers'">
        Add to Order Tracker
      </button>
    </span>
    <span class="cellCounter" v-if="showCellCounter && counter > 1">Count: {{ counter }}</span>
  </div>
</template>

<style scoped>
.labels-container {
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

#label_type_container {
  position: relative;
  height: 80px;
}

#tablecontainer {
  flex: 1;
  overflow: auto;
  margin: 50px 0;
}

#label_info {
  position: absolute;
  top: calc((100% - 30px) / 2);
  margin-left: 14px;
  font-size: 30px;
  transition: all 0.2s ease-in-out;
  display: inline-block;
}

#label_info:hover {
  cursor: pointer;
  color: var(--color-accent-2);
}

#local_settings {
  font-size: 30px;
  position: absolute;
  margin-left: -40px;
  top: calc((100% - 30px) / 2);
  transition: all 0.2s ease-in-out;
  display: inline-block;
}

#local_settings:hover {
  cursor: pointer;
  color: var(--color-accent-2);
}

.label-button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px;
  gap: 1.5em;
}

.table-buttons {
  display: inline-block;
  padding: 0.35em 1.2em;
  border: none;
  text-align: center;
  transition: all 0.2s;
  font-size: 1em;
  min-width: 200px;
  min-height: 50px;
  border-radius: 2em;
  box-shadow: 2px 4px 5px 0px rgb(0 0 0 / 54%);
  transition: all 0.1s ease-in-out;
}

.table-buttons:hover {
  cursor: pointer;
}

#update_labels {
  color: var(--color-text);
  background-color: var(--color-main-2);
}

#clear_table {
  color: var(--color-text);
  background-color: var(--color-error-1);
}

#add_orders {
  color: var(--color-text);
  background-color: var(--color-main-2);
}

#update_labels:hover {
  background-color: var(--color-accent-2);
}

#clear_table:hover {
  background-color: var(--color-error-2);
}

#add_orders:hover {
  background-color: var(--color-accent-2);
}

.cellCounter {
  font-size: 0.7rem;
  text-align: right;
  height: 12px;
  position: fixed;
  bottom: 10px;
  right: 10px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media all and (max-width: 30em) {
  .interactionButtons {
    display: block;
    margin: 0.4em auto;
  }
}

@media (max-width: 450px) {
  #label_info {
    top: 80px;
    margin-left: -35px;
    font-size: 30px;
  }

  #local_settings {
    top: 80px;
    margin-left: 5px;
  }
}

@media (max-width: 735px) {
  .label-button-container {
    flex-direction: column;
  }
  .table-buttons {
    padding: 0.15em 0.5em;
    min-width: 165px;
  }
}
</style>
