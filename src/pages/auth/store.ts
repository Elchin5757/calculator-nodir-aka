import { defineStore } from "pinia";
import { removeItem, setItem } from "@/shared/utils/local_storage";
import { useGet, usePost } from "@/shared/api";
import { useNotificationStore } from "@/stores/notification";

interface PayloadLogin {
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): any => ({
    loading: false,
  }),
  actions: {
    async login(payload: PayloadLogin) {
      const notificationStore = useNotificationStore();
      this.loading = true
      return await usePost({
        url: "auth-token/",
        data: payload,
      })
        .then((res) => {
          if (res?.status === 200) {
            setItem("Authorization", res?.data?.access);
            setItem("refreshToken", res?.data?.refresh);
            notificationStore.setNotification("Siz muvaffaqiyatli tizimga kirdingiz", 'verified', 'positive');
            return res;
          }
        })
        .catch((error) => {
           notificationStore.setNotification(error.message, "error", "negative");
        }).finally(() => {
          this.loading = false
        })
    },
    logout() {
      removeItem("Authorization")
      removeItem("refreshToken")
      window.location.reload();
    }
  },
});
