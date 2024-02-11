import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import './assets/colors.css';

const app = createApp(App);
app.use(VueQueryPlugin);
app.mount('#app');
