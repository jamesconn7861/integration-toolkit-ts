<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';
export default defineComponent({
  emits: ['itemSelected'],
  setup() {
    const dropdownContainer = ref<HTMLDivElement>();
    return { dropdownContainer };
  },
  props: {
    placeholder: {
      type: String,
    },
    defaultValue: {
      type: String,
    },
    inputId: {
      type: String,
    },
    items: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  data() {
    return {
      selectedItem: undefined as String | undefined,
    };
  },
  methods: {
    handleSelection(e: MouseEvent) {
      const selection = e.currentTarget as HTMLLabelElement;
      this.dropdownContainer?.parentElement?.querySelectorAll('.selected').forEach((option) => {
        if (option != selection) option.classList.remove('selected');
      });
      selection.classList.toggle('selected');

      this.selectedItem = selection.innerText;
      this.dropdownContainer?.classList.remove('.open');
      this.$emit('itemSelected', this.selectedItem);
    },
    handleOpenState(e: MouseEvent) {
      const currentContainer = e.currentTarget as HTMLDivElement;
      currentContainer.classList.toggle('open');
      document.querySelectorAll('.select-container.open').forEach((container) => {
        if (container != currentContainer) {
          container.classList.remove('open');
        }
      });
    },
  },
  mounted() {
    if (!this.dropdownContainer) return;
    this.dropdownContainer.onclick = () => {
      this.dropdownContainer?.classList.toggle('open');
    };
  },
});
</script>

<template>
  <div class="select-container" @click="handleOpenState">
    <p class="field-header" v-if="selectedItem">{{ placeholder }}</p>
    <div class="select-input-container" ref="dropdownContainer">
      <input
        type="text"
        class="selected-item"
        :id="inputId"
        :class="{ empty: !selectedItem }"
        :placeholder="placeholder"
        :value="selectedItem || defaultValue"
        onfocus="this.blur();"
      />
      <i class="bx bx-chevron-down"></i>
    </div>
    <div class="option-container">
      <label v-for="item in items" @click="handleSelection" class="option">
        {{ item }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.select-container {
  min-width: 100px;
  position: relative;
  width: fit-content;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  background-color: var(--color-main-2);
  padding: 5px 0;
  text-align: left;
}

.select-container:hover {
  cursor: pointer;
}

.select-input-container {
  border-radius: 5px;
  position: relative;
  height: 35px;
}

/* .select-input-container::after {
  position: absolute;
  content: '';
  width: 10px;
  height: 10px;
  top: 0;
  margin: auto;
  right: 8px;
  transform: rotate(45deg);
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  cursor: pointer;
  transition: border-color 0.4s;
} */

.field-header {
  position: absolute;
  top: 2px;
  left: 15px;
  color: #9b9a9c;
  font-size: 12px;
}
.bx {
  position: absolute;
  right: 2px;
  font-size: 1.5em;
  color: white;
  transition: all 300ms ease;
  display: flex;
  height: 100%;
  top: 0;
  align-items: center;
}

.select-container.open .bx {
  transform: rotate(180deg);
}

/* .select-container.open .select-input-container::after {
  border: none;
  transform: translateY(50%) rotate(45deg);
  border-left: 2px solid white;
  border-top: 2px solid white;
} */

.selected-item.empty {
  margin-top: 0px;
}

.selected-item {
  position: relative;
  width: 90%;
  height: 100%;
  padding: 0 15px;
  background: none;
  outline: none;
  border: none;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  text-overflow: ellipsis;
  font-family: inherit;
  margin-top: 8px;
}

.select-container .option-container {
  position: absolute;
  border-radius: 5px;
  width: 100%;
  background: #6e6477;
  height: 0;
  overflow-y: overlay;
  transition: 0.4s;
  z-index: 200;
  opacity: 0;
  transform: translateY(50px);
  transition: all 200ms ease-in-out;
}

.select-container.open .option-container {
  opacity: 1;
  max-height: 50dvh;
  height: auto;
  transform: translateY(15px);
}

.select-container .option-container::-webkit-scrollbar {
  width: 10px;
}

.select-container .option-container::-webkit-scrollbar-thumb {
  background: #0f0e11;
}

.option-container .option {
  position: relative;
  padding: 10px;
  height: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: 0.2s;
}

.option-container .option.selected {
  background: rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.option-container .option:hover {
  background: rgba(0, 0, 0, 0.2);
  padding-left: 20px;
}

.option-container .option label {
  font-size: 0.8rem;
  color: white;
  cursor: pointer;
}
</style>
