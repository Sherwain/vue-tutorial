<template>
  <form @submit.prevent="postData">
    <div>
      <label for="name">Name</label>
      <input type="text" name="name" v-model="name" />
    </div>
    <div>
      <label for="phone">Phone Number</label>
      <input type="tel" name="phone" v-model="phone" />
    </div>
    <div>
      <label for="email">email</label>
      <input type="email" name="email" v-model="email" />
    </div>
    <div>
      <button :click="addInfo">Add Info</button>
    </div>
  </form>
</template>

<script>
export default {
  emits: {
    addInfo: function (id) {
      if (id) return true;
      return false;
    },
  },
  data() {
    return {
      name: "",
      phone: "",
      email: "",
    };
  },

  methods: {
    postData() {
      this.$emit("addInfo", {
        name: this.name,
        email: this.email,
        phone: this.phone,
      });
    },
  },
};
</script>
