
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

import layouts from "@/layouts"
import App from './App.vue'
import router from './router'
import "./shared/assets/main.scss"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: {Notify}, // import Quasar plugins and add here
})
app.use(layouts)

app.mount('#app')
