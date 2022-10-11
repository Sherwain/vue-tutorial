<template>
  <header><h1>My Friends' List</h1></header>
  <new-friend @addInfo="saveInfo"></new-friend>
  <ul>
    <friend-contact
      v-for="(friend, index) in friends"
      :key="index"
      :index="index"
      :id="friend.id"
      :name="friend.name"
      :email="friend.email"
      :phone="friend.phone"
      :is-favorite="friend.isFavorite"
      @toggle-favorite="toggleFavorite"
      @deleteContact="removeContact"
    ></friend-contact>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      friends: [
        {
          id: "Manuel",
          name: "Manuel Lorenz",
          phone: "948 483-3206",
          email: "manuel@localhost.com",
          isFavorite: false,
        },
        {
          id: "Julee",
          name: "Julee Thompson",
          phone: "305 204-6947",
          email: "julee@localhost.com",
          isFavorite: true,
        },
      ],
    };
  },

  methods: {
    toggleFavorite(id, index) {
      console.log("toggle button clicked for id:", id);
      console.log(this.friends[index].isFavorite);
      this.friends[index].isFavorite = !this.friends[index].isFavorite;
      console.log(this.friends[index].isFavorite);
    },

    saveInfo(data) {
      console.log(data);
      this.friends.push({
        id: data.name.split("")[0],
        ...data,
        isFavorite: false,
      });
    },

    removeContact(index) {
      console.log("Removing", this.friends[index]);
      this.friends.splice(index, 1);
    },
  },
};
</script>
