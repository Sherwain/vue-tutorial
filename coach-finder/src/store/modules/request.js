import Request from '../classes/Request';

const APPROVE = 'APPROVE';
const DENIED = 'DENIED';
const PENDING = 'PENDING';
const COMPLETED = 'COMPLETED';

export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },

  mutations: {
    async add(state, newRequest) {
      const response = await fetch(
        'https://vue-http-demo-234e6-default-rtdb.firebaseio.com/request.json',
        {
          method: 'POST',
          body: JSON.stringify(newRequest),
        }
      );
      const data = await response.json();
      if (!data.ok) {
        console.log('Error writing data to database');
      }
    },

    setRequests(state, requests) {
      state.requests = requests;
    },

    remove(state, id) {
      delete state.requests[id];
    },

    approveRequest(state, id) {
      state.requests[id].status = APPROVE;
    },

    denyRequest(state, id) {
      state.requests[id].status = DENIED;
    },

    completeRequest(state, id) {
      state.requests[id].status = COMPLETED;
    },

    pendingRequest(state, id) {
      state.requests[id].status = PENDING;
    },
  },

  actions: {
    async fetchRequests(context, userId) {
      const user = context.rootGetters['auth/getUser'];
      const response = await fetch(
        `https://vue-http-demo-234e6-default-rtdb.firebaseio.com/requests/${userId}.json?` +
          user.accessToken
      );
      try {
        if (!response.ok) {
          throw new Error(response.statusText, response.status);
        }
        const data = await response.json();
        const requests = [];
        Object.entries(data).map(([_id, obj]) => {
          requests.push({ ...obj, name: _id });
        });

        // const formattedData = Object.fromEntries(
        //   Object.entries(data).map(([_id, obj]) => [
        //     obj.recipientId,
        //     { ...obj, name: _id },
        //   ])
        // );
        context.commit('setRequests', requests);
      } catch (err) {
        throw new Error(err);
      }
    },

    async addRequest(context, payload) {
      const newRequest = new Request(
        payload.body,
        payload.recipientEmail,
        payload.recipientId,
        payload.requesterEmail,
        payload.requesterId,
        payload.status
      );
      try {
        const response = await fetch(
          `https://vue-http-demo-234e6-default-rtdb.firebaseio.com/requests/${newRequest.recipientId}.json`,
          {
            method: 'POST',
            body: JSON.stringify(newRequest),
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText, response.status);
        }
        const data = await response.json();
        const formattedData = Object.fromEntries(
          Object.entries(data).map(([, obj]) => [obj.id, obj])
        );
        context.commit('add', formattedData);
        console.log('Written successfully to database');
      } catch (err) {
        console.log('Error writing data to Firebase');
      }
    },

    removeRequest(context, payload) {
      context.commit('remove', payload);
    },

    approve(context, index) {
      context.commit('approveRequest', index);
    },

    deny(context, index) {
      context.commit('denyRequest', index);
    },

    complete(context, index) {
      context.commit('completeRequest', index);
    },

    pending(context, index) {
      context.commit('pendingRequest', index);
    },
  },

  getters: {
    getRequests(state) {
      return state.requests;
    },

    containsRequests(state) {
      return Object.keys(state.requests).length;
    },
  },
};
