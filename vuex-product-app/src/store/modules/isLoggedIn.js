export default {
  namespace: true,
  state() {
    return {
      isLoggedIn: true,
    };
  },

  mutations: {
    loginUser(state) {
      state.isLoggedIn = true;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
    },
  },

  actions: {
    logout(context) {
      context.commit('logoutUser');
    },

    login(context) {
      context.commit('loginUser');
    },
  },

  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
  },
};
