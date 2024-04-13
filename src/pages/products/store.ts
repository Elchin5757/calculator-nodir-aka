import { useGet } from "@/shared/api";
import { defineStore } from "pinia";
import { useNotificationStore } from "@/stores/notification";

export const useProducts = defineStore("applications", {
  state: () => ({
    products: [],
    productsLoading: false,
  }),
  actions: {
    async getProducts() {
      const notificationStore = useNotificationStore();
      this.productsLoading = true;
      return await useGet({
        url: "products/",
      })
        .then((res: any) => {
          if (res?.status === 200) {
            this.products = res?.data;
            return res;
          }
        })
        .catch((error: any) => {
          notificationStore.setNotification(error.message, "error", "negative");
        })
        .finally(() => {
          this.productsLoading = false;
        });
    },
  },
});
