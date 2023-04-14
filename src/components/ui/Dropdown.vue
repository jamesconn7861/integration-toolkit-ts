<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';
export default defineComponent({
  emits: ['itemSelected'],
  setup() {
    const ddCheckbox = ref<HTMLInputElement>();

    return { ddCheckbox };
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
      isOpen: false,
    };
  },
  methods: {
    handleItemSelect(e: MouseEvent) {
      this.selectedItem = (e.currentTarget as HTMLSpanElement).innerText;
      this.isOpen = false;
      this.$emit('itemSelected', this.selectedItem);
    },
  },
});
</script>

<template>
  <div class="dropdown-container">
    <input class="dropdown-checkbox" type="checkbox" v-model="isOpen" />
    <label @click="isOpen = !isOpen" class="dropdown-selected" for="dropdown_checkbox">{{
      selectedItem || placeholder
    }}</label>
    <div class="dropdown-tray">
      <span v-for="item in items" @click="handleItemSelect" class="dropdown-menu-item">
        {{ item }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.dropdown-container {
  position: relative;
  max-width: 100%;
  text-align: center;
  z-index: 200;
  margin: 15px auto;
  display: inline-block;
}

.dropdown-checkbox {
  display: none;
}

.dropdown-selected {
  font-size: 16px;
  height: 50px;
  border-radius: 4px;
  padding: 15px;
  width: 25dvw;
  min-width: 150px;
  max-width: 300px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  border: none;
  background-color: var(--color-main-2);
  cursor: pointer;
  color: #fff;
  box-shadow: 2px 4px 5px 0px rgb(0 0 0 / 54%);
}

.dropdown-tray {
  position: absolute;
  padding: 5px;
  background-color: var(--color-main-2);
  top: 70px;
  left: 0;
  width: 100%;
  border-radius: 4px;
  display: block;
  z-index: 2;
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px);
  transition: all 200ms linear;
  box-shadow: 2px 4px 5px 0px rgb(0 0 0 / 54%);
}

.dropdown-checkbox:checked ~ .dropdown-tray {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.dropdown-tray:after {
  position: absolute;
  top: -7px;
  left: 30px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid var(--color-main-2);
  content: '';
  display: block;
  z-index: 2;
}

.dropdown-menu-item {
  position: relative;
  color: #fff;
  transition: all 200ms linear;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 15px;
  border-radius: 2px;
  padding: 5px 0;
  padding-left: 20px;
  padding-right: 15px;
  margin: 2px 0;
  text-align: left;
  text-decoration: none;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  justify-content: space-between;
  -ms-flex-pack: distribute;
}

.dropdown-menu-item:hover {
  color: var(--color-main-2);
  background-color: var(--color-highlight-1);
  cursor: pointer;
}
</style>
