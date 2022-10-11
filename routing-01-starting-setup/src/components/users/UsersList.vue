<template>
  <button @click="confirmInput">confirm</button>
  <button @click="saveChanges">Save Data</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],

  data() {
    return {
      saveData: false,
    };
  },

  methods: {
    confirmInput() {
      this.$router.push('/teams');
    },

    saveChanges() {
      this.saveData = true;
    },
  },

  beforeRouteLeave(to, _, next) {
    if (this.saveData) {
      next();
    } else {
      const leavePage = confirm(
        'Are you sure you want to leave this page without saving the data?'
      );
      next(leavePage);
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
