import { defineStore } from 'pinia'
import { Notify  } from "quasar";

export const useNotificationStore = defineStore('notifications', {
  actions: {
    setNotification(message: string, icon?: "verified" | 'error', color?: "positive" | "negative" | "warning", ) {
      Notify.create({
        message,
        icon,
        color,
        timeout: 1500,
        position: 'top-right',
      });
    }
  }
})