import Appointment from '../classes/Appointment';

export default {
  namespaced: true,
  state() {
    return {
      appointments: [],
    };
  },

  mutations: {
    add(state, payload) {
      state.appointments.push(
        new Appointment(
          payload.coach,
          payload.member,
          payload.activity,
          payload.date,
          payload.duration
        )
      );
    },

    remove(state, index) {
      state.appointments.splice(index, 1);
    },
  },

  actions: {
    addMessage(context, payload) {
      context.commit('add', payload);
    },

    removeMessage(context, index) {
      context.commit('remove', index);
    },
  },

  getters: {
    getAppointment(state, index) {
      return state.appointments[index];
    },

    getAppointments(state) {
      return state.appointments;
    },
  },
};
