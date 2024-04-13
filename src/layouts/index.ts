import type { App } from 'vue'
import AuthLayout from './auth-layout/index.vue'
import MainLayout from './main-layout/index.vue'

export default {
  install(app: App) {
    app.component('AuthLayout', AuthLayout)
    app.component('MainLayout', MainLayout)
  }
}
