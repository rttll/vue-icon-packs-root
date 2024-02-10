import { createApp } from 'vue';
import { createRouter } from './router';
import './style.css';
import App from './App.vue';

const app = createApp(App);
const router = createRouter();
app.use(router);

router.isReady().then(() => {
  app.mount('#app');
});
