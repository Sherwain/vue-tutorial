import User from '../classes/User';

const MEMBER = 'MEMBER';

export default {
  namespaced: true,
  state() {
    return {
      member: [],
    };
  },

  mutations: {
    add(state, member) {
      state.members.push(
        new User(
          member.firstName,
          member.lastName,
          member.email,
          MEMBER,
          member.activities
        )
      );
    },

    remove(state, index) {
      state.member.splice(index, 1);
    },

    addActivityToMember(state, index, activity) {
      state.member[index].addActivity(activity);
    },

    removeActivityToMember(state, index, activity) {
      state.member[index].removeActivity(activity);
    },
  },

  actions: {
    addMember(context, member) {
      context.commit('add', member);
    },

    removeMember(context, payload) {
      context.commit('remove', payload);
    },

    addActivity(context, payload) {
      context.commit('addActivityToMember', payload);
    },

    removeActivity(context, payload) {
      context.commit('removeActivityToMember', payload);
    },
  },

  getters: {
    getMembers(state) {
      return state.members;
    },

    getMember(state, index) {
      return state.members[index];
    },
  },
};
