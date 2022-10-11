import { createStore } from 'vuex';

import product from './modules/product';
import cart from './modules/cart';
import isLoggedIn from './modules/isLoggedIn';

export default createStore({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    productM: product,
    cart,
    isLoggedIn,
  },
});
