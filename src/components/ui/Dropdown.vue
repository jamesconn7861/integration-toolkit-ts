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
      this.selectedItem = (e.currentTarget as HTMLSpanElement).innerText;
      this.dropdownContainer?.classList.remove('.open');
      this.$emit('itemSelected', this.selectedItem);
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
  <div ref="dropdownContainer" class="dropdown-container">
    <label class="dropdown-selected"
      >{{ selectedItem || placeholder }}
      <i class="bx bx-chevron-down"></i>
      <div ref="dropdownTray" class="dropdown-tray">
        <label v-for="item in items" @click="handleSelection" class="dropdown-menu-item">
          {{ item }}
        </label>
      </div>
    </label>
  </div>
</template>

<style scoped>
.dropdown-container {
  position: relative;
  width: fit-content;
  min-width: 200px;
  max-width: 80%;
  padding: 0 20px;
  text-align: center;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: inline-block;
}

.dropdown-selected {
  position: relative;
  font-size: 1em;
  border-radius: 0.5em;
  padding: 10px 25px;
  width: fit-content;
  min-width: 15dvw;
  max-width: 75vw;
  background-color: var(--color-main-2);
  color: var(--color-text);
  cursor: pointer;
  box-shadow: 2px 4px 5px 0px rgb(0 0 0 / 54%);
  z-index: 200;
}

.bx {
  position: absolute;
  right: 2px;
  font-size: 1.5em;
  color: white;
  margin: auto 0;
  transition: all 500ms ease;
}

.dropdown-tray {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 5px;
  background-color: var(--color-main-2);
  color: var(--color-text);
  width: 100%;
  border-radius: 0.5em;
  /* margin-top: 8px; */
  top: 50px;
  left: 0;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-50px);
  transition: all 350ms ease-in-out;
  box-shadow: 2px 4px 5px 0px rgb(0 0 0 / 54%);
  max-height: 50dvh;
  position: absolute;
  overflow: auto;
}

.dropdown-container.open .dropdown-tray {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.dropdown-container.open .dropdown-menu-item {
  pointer-events: auto;
  cursor: pointer;
}

.dropdown-container.open .bx {
  transform: rotate(180deg);
}

.dropdown-menu-item {
  transition: all 350ms ease-in-out;
  font-size: 0.9em;
  border-radius: 5px;
  padding: 5px 10px;
  text-align: left;
  pointer-events: none;
  padding: 10px;
}

.dropdown-menu-item:hover {
  padding-left: 15px;
  color: var(--color-main-2);
  background-color: var(--color-highlight-1);
  cursor: pointer;
}
</style>
