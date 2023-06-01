<script lang="ts">
import router from '@/router';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const navButton = ref<HTMLButtonElement>();
    return { navButton };
  },
  emits: ['navigate'],
  props: {
    component: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      required: true,
    },
    itemText: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeComponent() {
      if (this.navButton?.classList.contains('is-selected')) return;
      document.querySelector('.is-selected')?.classList.remove('is-selected');
      this.navButton?.classList.add('is-selected');
      this.$emit('navigate', this.component);
      // router.push({ name: this.component });
    },
  },
});
</script>

<template>
  <button class="nav-item-button" ref="navButton" @click="changeComponent">
    <i :class="iconClass"></i>
    <span class="nav-item-label">{{ itemText }}</span>
  </button>
  <span class="nav-item-tooltip">{{ itemText }}</span>
</template>

<style scoped>
.nav-item-button {
  display: grid;
  grid-template-columns: 55px auto;
  height: 55px;
  width: -webkit-fill-available;
  border-radius: 12px;
  text-decoration: none;
  align-items: center;
  transition: all 0.4s ease;
  border: none;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  padding: 0;
}

.nav-item-button:hover {
  background: var(--color-accent-2);
}

.nav-item-button.is-selected {
  background: var(--color-accent-2);
}

.nav-item-icon {
  width: 55px;
  font-size: 28px;
  justify-self: center;
  grid-column-start: 1;
}

.nav-item-label {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
  grid-column-start: 2;
  text-align: left;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.nav-item-tooltip {
  background-color: var(--color-accent-1);
  position: relative;
  top: -100px;
  left: calc(100% + 20px);
  z-index: 3;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: 0.4s ease;
}

.nav-item-tooltip:before {
  content: '';
  position: absolute;
  top: 25%;
  left: -14px;
  z-index: 1;
  border: solid 8px transparent;
  border-right-color: var(--color-accent-1);
}

.nav-item-button:hover + .nav-item-tooltip {
  opacity: 1;
  pointer-events: auto;
  top: -38px;
}

.nav-container.open .nav-item-label {
  opacity: 1;
  pointer-events: auto;
}

.nav-container.open .nav-item-tooltip {
  display: none;
}

@media (max-width: 420px) {
  .nav-item-tooltip {
    display: none;
  }
}

@media (hover: none) {
  .nav-item-tooltip {
    opacity: 0 !important;
  }
}
</style>
