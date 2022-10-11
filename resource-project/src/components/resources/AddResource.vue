<template>
  <base-dialog v-if="inputInvalid" title="Invalid Entry" @close="confirmError">
    <template #default>
      <p>At least one or more inputs are invalid.</p>
      <p>
        Please check the inputs and make sure toy ate at least enter valid dat
        for all the fields
      </p>
    </template>
    <template v-slot:actions>
      <base-button @click="confirmError">Okay</base-button>
    </template>
  </base-dialog>
  <base-card>
    <form @submit.prevent="getFormData">
      <div class="form-control">
        <label for="title">Title</label>
        <input name="title" id="title" type="text" v-model="title" />
      </div>

      <div class="form-control">
        <label for="link">link</label>
        <textarea name="link" id="link" rows="3" v-model="link"></textarea>
      </div>

      <div class="form-control">
        <label for="description">Description</label>
        <input
          name="description"
          id="description"
          type="text"
          v-model="description"
        />
      </div>

      <base-button type="submit">Add Resource</base-button>
    </form>
  </base-card>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
import BaseDialog from "../UI/BaseDialog.vue";
export default {
  components: { BaseDialog, BaseButton },
  // emits: ["saveResource"],

  inject: ["addResources"],

  data() {
    return {
      inputInvalid: false,
      title: "",
      description: "",
      link: "",
    };
  },

  methods: {
    getFormData() {
      if (
        this.title.trim() == "" ||
        this.description.trim() == "" ||
        this.link.trim() == ""
      ) {
        this.inputInvalid = true;
        return;
      }
      const data = {
        title: this.title,
        description: this.description,
        link: this.link,
      };
      this.addResources(data);
      // this.$emit("saveResource", data);
    },

    confirmError() {
      this.inputInvalid = false;
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>
