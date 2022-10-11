<template>
  <ul>
    <resource-item
      v-for="(item, index) in storedResources"
      :index="index"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :description="item.description"
      :link="item.link"
    ></resource-item>
  </ul>
</template>

<script>
import ResourceItem from "./ResourceItem.vue";

export default {
  components: {
    ResourceItem,
  },

  props: ["index", "id", "title", "description", "link"],

  inject: ["storedResources"],

  data() {
    return {};
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  margin: auto;
  max-width: 40rem;
}
</style>
