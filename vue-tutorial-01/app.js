const app = Vue.createApp({
  data() {
    return {
      goal: "course finished",
      goals: [],
      vueLink: "https://vuejs.com",
    };
  },

  methods: {
    outputGoal() {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return "Learn Vue";
      } else {
        return "master Vue";
      }
    },
  },
});

app.mount("#user-goal");
