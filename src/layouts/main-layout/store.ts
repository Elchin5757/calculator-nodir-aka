import { defineStore } from "pinia";

export const useMainLayoutStore = defineStore({
  id: "main-layout",
  state: () => ({
    sidebar: false,
  }),
  actions: {
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },
  },
});