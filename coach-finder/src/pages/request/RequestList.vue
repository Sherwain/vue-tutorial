<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>request received</h2>
        </header>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="containsData">
          <request-item
            v-for="request in requests"
            :key="request.id"
            :body="request.body"
            :recipientEmail="request.recipientEmail"
            :recipientId="request.recipientId"
            :requesterEmail="request.requesterEmail"
            :requesterId="request.requesterId"
            :status="request.status"
          ></request-item>
        </ul>
        <h3 v-else>No request to show</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import RequestItem from '../../components/request/RequestItem.vue';

export default {
  components: { RequestItem },

  data() {
    return {
      isLoading: false,
      error: null,
    };
  },

  computed: {
    containsData() {
      return this.$store.getters['request/containsRequests'];
    },

    requests() {
      return this.$store.getters['request/getRequests'];
    },
  },

  methods: {
    async loadRequest() {
      try {
        this.isLoading = true;
        await this.$store.dispatch(
          'request/fetchRequests',
          this.$route.params.id
        );
      } catch (e) {
        this.error = e.message;
      } finally {
        this.isLoading = false;
      }
    },

    handleError() {
      this.error = null;
    },
  },

  created() {
    this.loadRequest();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
