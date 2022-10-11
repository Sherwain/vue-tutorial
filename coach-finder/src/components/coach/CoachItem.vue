<template>
  <li>
    <h3>{{ firstName }} {{ lastName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="activity in activities"
        :key="activity"
        :type="activity"
        :title="activity"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button mode="outline" link :to="this.$route.path + '/' + id"
        >view coach details</base-button
      >
      <base-button link :to="'/coaches/' + id + '/requests/new'"
        >Request {{ firstName }} {{ lastName }}</base-button
      >
    </div>
  </li>
</template>

<script>
import BaseBadge from '../ui/BaseBadge.vue';
export default {
  components: { BaseBadge },
  props: [
    'id',
    'index',
    'firstName',
    'lastName',
    'description',
    'activities',
    'rate',
  ],

  data() {
    return {};
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
