<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ coach.rate }} per hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="'/coaches/' + coach.id + '/requests/new'">
            Request
          </base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="activity in coach.activities"
          :key="activity"
          :type="activity"
          :title="activity"
        >
        </base-badge>
        <p>{{ coach.description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  // props: ['firstName', 'lastName', 'rate']

  data() {
    return {
      coach: '',
    };
  },

  computed: {
    fullName() {
      return `${this.coach.firstName} ${this.coach.lastName}`;
    },

    makeRequestLink() {
      return {
        name: 'new-requests',
      };
    },
  },

  methods: {
    async coachData(id) {
      // this.coach = this.$store.getters.coach(id);
      await this.$store.dispatch('coach/fetchCoaches');
      this.coach = this.$store.getters['coach/coach'](id);
    },
  },

  watch: {
    $route(newRoute) {
      this.coachData(newRoute.params.id);
    },
  },

  created() {
    this.coachData(this.$route.params.id);
  },
};
</script>
