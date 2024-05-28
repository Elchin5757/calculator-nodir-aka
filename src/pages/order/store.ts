import { useGet, usePost } from "@/shared/api";
import { defineStore } from "pinia";
import { useNotificationStore } from "@/stores/notification";

export const useOrders = defineStore("orders", {
  state: () => ({
    orders: [],
    tableLoading: false,
    createLoading: false,
  }),
  actions: {
    async getOrders() {
      const notificationStore = useNotificationStore();
      this.tableLoading = true;
      return await useGet({
        url: "order/",
      })
        .then((res: any) => {
          if (res?.status === 200) {
            this.orders = res?.data;
            return res;
          }
        })
        .catch((error: any) => {
          notificationStore.setNotification(error.message, "error", "negative");
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    async createOrder(data: any) {
      const notificationStore = useNotificationStore();
      this.createLoading = true;
      return await usePost({
        url: "orders/",
        data,
      })
        .then((res: any) => {
          if (res?.status === 201) {
            notificationStore.setNotification(
              "Buyurtma muvaffaqiyatli qo'shildi",
              "verified",
              "positive"
            );
            return res;
          }
        })
        .catch((error: any) => {
          notificationStore.setNotification(error.message, "error", "negative");
        })
        .finally(() => {
          this.createLoading = false;
        });
    },
  },
});
