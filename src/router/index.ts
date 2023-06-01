import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: "/labels",
      name: "LabelsView",
      component: () => import('../views/LabelsView.vue'),
    },
    {
      path: "/vlanChanger",
      name: "VlanView",
      component: () => import('../views/VlanView.vue'),
    },
    {
      path: "/faq",
      name: "FAQView",
      component: () => import('../views/FAQView.vue'),
    },
    {
      path: "/settings",
      name: "SettingsView",
      component: () => import('../views/SettingsView.vue'),
    },
  ],
});

export default router;
