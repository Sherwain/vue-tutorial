<template>
  <form @submit.prevent="submitData">
    <div>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model.trim="email" />
    </div>
    <div>
      <label for="body">Message</label>
      <textarea
        type="text"
        name="body"
        id="body"
        row="5"
        col="4"
        v-model.trim="body"
      >
      </textarea>
    </div>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
const PENDING = 'PENDING';
export default {
  emits: ['makeRequest'],

  data() {
    return {
      email: '',
      body: '',
      recipientEmail: '',
      recipientId: '',
    };
  },

  methods: {
    ...mapGetters({
      getCoachData: 'coach/coach',
    }),

    submitData() {
      this.$store.dispatch('request/addRequest', {
        requesterEmail: this.email,
        requesterId: '770a4489-6296-4a2f-a46d-d647da4c8c4b',
        body: this.body,
        status: PENDING,
        recipientEmail: this.recipientEmail,
        recipientId: this.recipientId,
      });
      this.$router.replace('/coaches');
    },

    loadCoachData() {
      const coachData = this.$store.getters['coach/coach'](
        this.$route.params.id
      );
      this.recipientId = coachData.id;
      this.recipientEmail = coachData.email;
    },
  },

  created() {
    this.loadCoachData();
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
