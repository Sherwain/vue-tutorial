import { createStore } from 'vuex';

import request from './modules/request';
import activity from './modules/activity';
import appointment from './modules/appointment';
import coach from './modules/coach';
import member from './modules/member';
import auth from './modules/auth';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    activity,
    appointment,
    coach,
    member,
    request,
    auth,
  },
});
