import { fireAuth } from '../../firebaseConfig';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export default {
  namespaced: true,
  state: {
    loggedIn: false,
    user: null,
  },

  mutations: {
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },

    setUser(state, user) {
      state.user = user;
    },
  },

  actions: {
    // auth
    async auth(context, payload) {
      try {
        let userCredential;
        if (payload.action === 'login') {
          userCredential = await signInWithEmailAndPassword(
            fireAuth,
            payload.email,
            payload.password
          );
        } else
          userCredential = await createUserWithEmailAndPassword(
            fireAuth,
            payload.email,
            payload.password
          );
        if (userCredential) {
          context.commit('setUser', userCredential.user);
          localStorage.setItem('user', JSON.stringify(userCredential.user));
          context.dispatch('checkIfLoginExpired');
        } else {
          throw new Error('Unable to authenticate user');
        }
      } catch (error) {
        console.log(error);
        throw new Error(error.message, error.code);
      }
    },

    logout(context) {
      signOut(fireAuth)
        .then(() => {
          // Sign-out successful.
          context.commit('setLoggedIn', false);
          context.commit('setUser', null);
          localStorage.removeItem('user');
        })
        .catch((err) => {
          throw new Error(err.message, err.code);
        });
    },

    loginViaLocalStorage(context, value) {
      const storedUser = localStorage.getItem(value);
      if (storedUser) {
        context.commit('setUser', JSON.parse(storedUser));
        context.commit('setLoggedIn', false);
        console.log('Logged in via localStorage');
        context.dispatch('checkIfLoginExpired');
      }
    },

    async fetchUser(context, user) {
      context.commit('setLoggedIn', user !== null);
      if (user) {
        context.commit('setUser', user);
      } else {
        context.commit('setUser', null);
      }
    },

    checkIfLoginExpired(context) {
      const user = context.getters.getUser;
      if (new Date().getTime() >= user.stsTokenManager.expirationTime) {
        context.dispatch('logout');
      }
    },
  },

  getters: {
    getUser(state) {
      return state.user;
    },

    isLoggedIn(state) {
      return state.loggedIn;
    },
  },
};
