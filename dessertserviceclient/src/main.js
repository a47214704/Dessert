import { createApp } from 'vue'
import App from './App.vue'
import './tailwindcss.css'
import router from './router'

const app = createApp(App).use(router)
app.config.globalProperties.$BaseUrl = "http://localhost:5210";
app.mount('#app')
