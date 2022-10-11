<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section><coach-filter @filter="filterCoaches"></coach-filter></section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">
            Refresh
          </base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to Register as Coach</base-button
          >
          <base-button
            v-if="isLoggedIn && !isLoading"
            to="/register?type=coach"
            link
          >
            Become A Coach
          </base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-if="!isLoading && coaches && Object.keys(coaches).length">
          <h1>List Of Coaches</h1>
          <coach-item
            v-for="[id, coach] in Object.entries(coaches)"
            :key="id"
            :id="id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.rate"
            :activities="coach.activities"
          >
          </coach-item>
        </ul>
        <h3 v-else>No Coaches Found</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coach/CoachItem.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
import CoachFilter from '../../components/coach/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    BaseButton,
    CoachFilter,
  },

  data() {
    return {
      isLoading: false,
      coaches: null,
      error: null,
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn'];
    },
    // coaches() {
    //   return this.$store.getters['coaches'];
    // },
    // ...mapActions({ refresh: 'coach/fetchCoaches' }),
  },

  methods: {
    async filterCoaches(area) {
      // this.coaches = this.$store.getters.filterCoaches(area);
      this.coaches = await this.$store.getters['coach/filterCoaches'](area);
    },

    async loadCoaches(forceRefresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coach/fetchCoaches', forceRefresh);
        this.filterCoaches('All');
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      } finally {
        this.isLoading = false;
      }
    },

    handleError() {
      this.error = null;
    },
  },

  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
