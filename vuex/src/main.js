import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';

const counterModule = {
  state() {
    return {
      counter: 0,
    };
  },

  mutations: {
    increment(state) {
      state.counter++;
    },

    incrementBy(state, payload) {
      state.counter += payload.data;
    },
  },

  getters: {
    finalCounter(state) {
      return state.counter * 2;
    },
  },

  actions: {
    increment(context) {
      setTimeout(() => {
        context.commit('increment');
      }, 3000);
    },
  },
};

const store = createStore({
  modules: {
    counter: counterModule,
  },
});

createApp(App).use(store).mount('#app');
