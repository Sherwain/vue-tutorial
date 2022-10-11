import Coach from '../classes/Coach';

export default {
  namespaced: true,
  state() {
    return {
      lastFetched: true,
      coaches: {},
    };
  },

  mutations: {
    async add(state, newCoach) {
      state.coaches[newCoach.id] = newCoach;
    },

    setCoaches(state, coaches) {
      state.coaches = coaches;
    },

    remove(state, id) {
      if (state.coaches) delete state.coaches[id];
    },

    addActivityToCoach(state, id, activity) {
      state.coaches[id].addActivity(activity);
    },

    removeActivityToCoach(state, id, activity) {
      state.coaches[id].removeActivity(activity);
    },

    setLastFetched(state) {
      state.lastFetched = new Date().getTime();
    },
  },

  actions: {
    async fetchCoaches(context, forcedFetch) {
      if (!context.getters.shouldRefresh && !forcedFetch) return;
      const response = await fetch(
        `https://vue-http-demo-234e6-default-rtdb.firebaseio.com/coaches.json`
      );
      try {
        if (!response.ok) {
          throw new Error(response.statusText, response.status);
        }
        const data = await response.json();
        context.commit('setCoaches', data);
        context.commit('setLastFetched');
      } catch (err) {
        throw new Error(err);
      }
    },

    async addCoach(context, payload) {
      const newCoach = new Coach(
        payload.firstName,
        payload.lastName,
        payload.email,
        payload.type,
        payload.activities,
        payload.description,
        payload.rate
      );
      const user = context.rootGetters['auth/getUser'];
      try {
        const response = await fetch(
          `https://vue-http-demo-234e6-default-rtdb.firebaseio.com/coaches/${newCoach.id}.json?auth=` +
            user.accessToken,
          {
            method: 'PUT',
            body: JSON.stringify(newCoach),
          }
        );
        const data = await response.json();
        context.commit('add', data);
        console.log('Written successfully to database');
      } catch (err) {
        console.log('Error writing data to Firebase');
      }
    },

    removeCoach(context, payload) {
      context.commit('remove', payload);
    },

    addActivity(context, payload) {
      context.commit('addActivityToCoach', payload);
    },

    removeActivity(context, payload) {
      context.commit('removeActivityToCoach', payload);
    },
  },

  getters: {
    async coaches(state) {
      return state.coaches;
    },

    coach: (state) => (id) => {
      return state.coaches[id];
    },

    shouldRefresh(state) {
      if (!state.lastFetched) return true;

      const currentTimestamp = new Date().getTime();
      return (currentTimestamp - state.lastFetched) / 1000 > 60;
    },

    filterCoaches:
      (state, getters, rootState, rootGetters) => async (activity) => {
        const result = {};
        const user = rootGetters['auth/getUser'];
        user;
        // console.log(user);
        // console.log(new Date().getTime());
        // console.log(new Date(user.stsTokenManager.expirationTime));
        if (activity === 'All') return state.coaches;
        Object.entries(state.coaches).forEach(([id, coach]) => {
          Array.from(coach.activities).forEach((act) => {
            if (act === activity) result[id] = coach;
          });
        });
        return result;
      },
  },
};
