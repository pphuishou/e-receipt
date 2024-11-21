import { createApp } from 'vue'
import '@/style/reset.css'
import App from './App.vue'
import 'amfe-flexible'
import Router from '@/router/index.js'
import { Notify, Toast  } from 'vant';
import { createPinia } from 'pinia'
const pinia = createPinia()

const app = createApp(App)

app.use(Router);
app.use(Notify);
app.use(Toast);
app.use(pinia);
app.mount('#app');
