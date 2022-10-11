<template>
  <form @submit.prevent="submitData">
    <div class="form-control">
      <label for="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        v-model.trim="firstName"
      />
    </div>
    <div class="form-control">
      <label for="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        v-model.trim="lastName"
      />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea
        id="description"
        name="description"
        v-model.trim="description"
        col="4"
      ></textarea>
    </div>
    <div class="form-control">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" name="rate" v-model.number="rate" />
    </div>
    <div class="form-control">
      <h3>Areas of expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="Frontend"
          v-model="activities"
        />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="Backend"
          v-model="activities"
        />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="Career"
          v-model="activities"
        />
        <label for="career">Career</label>
      </div>

      <div v-if="!type">
        <label for="">Signup As: </label>
        <select name="type" id="type" v-model="selectedType">
          <option
            v-for="coach in ['COACH', 'MEMBER']"
            :key="coach"
            :value="coach"
            :selected="coach === type"
          >
            {{ coach }}
          </option>
        </select>
        <label for="career"></label>
      </div>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  props: ['type'],

  emits: ['saveData'],

  data() {
    return {
      firstName: '',
      lastName: '',
      description: '',
      rate: 0,
      activities: [],
      selectedType: '',
      formIsValid: true,
    };
  },

  methods: {
    validateForm() {},

    submitData() {
      this.validateForm();

      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        description: this.description,
        type: this.type.toUpperCase() || this.selectedType,
        rate: this.rate,
        activities: this.activities,
      };
      this.$emit('saveData', payload);
    },
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
