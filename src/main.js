import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vuesax from 'vuesax3'
import 'vuesax3/dist/vuesax.css'
import '@fontsource/poppins'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vuesax)

app.mount('#app')
