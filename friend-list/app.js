Vue.createApp({
  data() {
    return {
      friends: [
        {
          id: "Manuel",
          name: "Manuel Lorenz",
          phone: "948 483-3206",
          email: "manuel@localhost.com",
        },
        {
          id: "Juleen",
          name: "Juleen Thompson",
          phone: "305 204-6947",
          email: "juleen@localhost.com",
        },
      ],
    };
  },
  methods: {
    // toggleVisibility(index) {
    //   console.log(index);
    //   this.friends[index].visible = !this.friends[index].visible;
    // },
  },
  computed: {},
})
  // this is like a basic html element, its basically a mini app
  .component("friend-contact", {
    template: `
      <li>
        <h2>{{friend.name}}</h2>
        <button @click="toggleVisibility">
          {{ visible ? "Hide" : "Show" }} Details
        </button>
        <ul v-if="visible">
          <li><strong>Phone:</strong>{{friend.phone}}</li>
          <li><strong>Email:</strong>{{friend.email}}</li>
        </ul>
      </li>
    `,
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      toggleVisibility() {
        this.visible = !this.visible;
      },
    },
  })
  .mount("#app");
