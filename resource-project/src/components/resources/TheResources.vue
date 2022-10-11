<template>
  <base-card>
    <base-button @click="setSelectedTab('stored-resources')" :mode="storedMode">
      Stored Resources
    </base-button>
    <base-button @click="setSelectedTab('add-resource')" :mode="AddMode">
      Add Resources
    </base-button>
  </base-card>
  <keep-alive>
    <component v-bind:is="currentTab" />
  </keep-alive>
</template>

<script>
import StoredResources from "./StoredResources.vue";
import AddResource from "./AddResource.vue";

export default {
  components: {
    StoredResources,
    AddResource,
  },
  data() {
    return {
      currentTab: "stored-resources",

      storedResources: [
        {
          id: "official-guide",
          title: "Official Guide",
          description: "The official vue.js documentation",
          link: "https://www.vuejs.com",
        },
        {
          id: "google",
          title: "Google",
          description: "Learn to google...",
          link: "https://www.google.com",
        },
      ],
    };
  },

  computed: {
    AddMode() {
      return this.currentTab == "add-resource" ? null : "flat";
    },

    storedMode() {
      return this.currentTab == "stored-resources" ? null : "flat";
    },
  },

  provide() {
    return {
      storedResources: this.storedResources,
      addResources: this.addResources,
      removeResources: this.removeResources,
    };
  },

  methods: {
    setSelectedTab(tab) {
      this.currentTab = tab;
    },

    addResources(data) {
      this.storedResources.push({
        id: data.title.replace(" ", "-").toLowerCase(),
        ...data,
      });
      this.currentTab = "stored-resources";
    },

    removeResources(index) {
      this.storedResources.splice(index, 1);
    },
  },
};
</script>
