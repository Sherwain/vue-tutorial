import Activity from '../classes/Activity';

export default {
  namespaced: true,
  state() {
    return {
      activities: Object.fromEntries(
        [
          new Activity('All', 'All'),
          new Activity('Backend', 'Technology'),
          new Activity('Frontend', 'Technology'),
          new Activity('Career', 'Personal Development'),
        ].map((activity) => [activity.id, activity])
      ),
    };
  },

  mutations: {
    add(state, payload) {
      const newActivity = new Activity(
        payload.coach,
        payload.member,
        payload.activity,
        payload.date,
        payload.duration
      );
      state.activities[newActivity.id] = newActivity;
    },

    remove(state, id) {
      delete state.activities[id];
    },
  },

  actions: {
    addActivity(context, payload) {
      context.commit('add', payload);
    },

    removeActivity(context, id) {
      context.commit('remove', id);
    },
  },

  getters: {
    activity: (state) => (id) => {
      return state.activities[id];
    },

    activities(state) {
      return state.activities;
    },
  },
};
