<template>
  <section>
    <base-card>
      <h2>Register to become a {{ type }} today</h2>
      <user-form :type="type" @saveData="saveData"></user-form>
    </base-card>
  </section>
</template>

<script>
import UserForm from '../../components/user/UserForm.vue';

export default {
  components: {
    UserForm,
  },

  data() {
    return {
      type: null,
    };
  },

  methods: {
    saveData(payload) {
      this.$store.dispatch('coach/addCoach', payload);
      // this.$router.push('/coaches');
      this.$router.replace('/coaches');
    },
  },

  watch: {
    route(newRoute) {
      this.type = newRoute.params.type;
    },
  },

  created() {
    this.type = this.$route.query.type;
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
