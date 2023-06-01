<script lang="ts">
import { useStore } from '@/stores/store';
import { defineComponent, ref } from 'vue';
import Dropdown from '@/components/ui/Dropdown.vue';

export default defineComponent({
  components: { Dropdown },
  setup() {
    const userField = ref<HTMLInputElement>();
    const currentUser = useStore().user;
    const themeList = useStore().themeList;
    const currentTheme = useStore().currentTheme;

    return { userField, currentUser, themeList, currentTheme };
  },
  methods: {
    async updateUser() {
      const newUser = this.userField?.value;
      if (!newUser) return;

      await useStore().setUser(newUser);

      useStore().showTempMsg({ msg: `Username has been updated to ${newUser}.` });
    },
    changeTheme(newTheme: string) {
      useStore().updateSetting('theme', newTheme);
    },
  },
  mounted() {},
});
</script>

<template>
  <div class="settings-container">
    <div class="settings-item input-component">
      <div class="settings-item-label">
        <p class="main-label">Username</p>
        <p class="secondary-label">The username to use when uploading label data.</p>
      </div>
      <div class="inputField">
        <input
          id="username_input"
          ref="userField"
          type="text"
          maxlength="30"
          :value="currentUser"
        />
      </div>
      <button id="change_user" class="interactionButtons" @click="updateUser">Save</button>
    </div>
    <div class="settings-item drop-down-componet">
      <div class="settings-item-label">
        <p class="main-label">Theme</p>
        <p class="secondary-label">Changes the overall theme of the site.</p>
      </div>
      <Dropdown
        :items="themeList"
        :placeholder="'Theme'"
        :default-value="currentTheme"
        @item-selected="changeTheme"
      ></Dropdown>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
  text-align: left;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: var(--settings-background-color);
  margin: 20px auto;
  flex-direction: column;
  gap: 50px;
  display: flex;
  overflow: overlay;
  padding: 20px;
}

.settings-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  gap: 35px;
  flex-wrap: wrap;
}

.settings-item-label {
  text-align: left;
}

.main-label {
  font-size: 18px;
  margin-bottom: 5px;
  text-align: left;
}

.secondary-label {
  font-size: 12px;
}

#change_user {
  padding: 15px 20px;
  border-radius: 12px;
  border: none;
  background-color: var(--color-main-2);
  color: var(--color-text);
}

#change_user:hover {
  cursor: pointer;
}

#username_input {
  padding: 10px;
}
</style>
