<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <label for="">Select You Area Of Interest: </label>
      <select name="interest" id="interest" v-model="selectedArea">
        <option v-for="area in areas" :key="area" :value="area">
          {{ area }}
        </option>
      </select>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['filter'],

  data() {
    return {
      selectedArea: 'All',
    };
  },

  watch: {
    selectedArea() {
      this.$emit('filter', this.selectedArea);
    },
  },
  computed: {
    areas() {
      return Object.values(this.$store.getters['activity/activities']).map(
        (activity) => activity.name
      );
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option select {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
