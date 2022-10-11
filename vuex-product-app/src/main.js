import { createApp } from 'vue';

import router from './router.js';
import App from './App.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import store from './store/index';

createApp(App)
  .use(router)
  .use(store)
  .component('base-badge', BaseBadge)
  .mount('#app');
