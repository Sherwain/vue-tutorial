<template>
  <div class="badge" :class="type">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: ['type', 'title'],
  data() {
    return {};
  },

  computed: {
    text() {
      return this.title.toUpperCase();
    },
  },
};
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.Frontend {
  background-color: #3d008d;
  color: white;
}

.Backend {
  background-color: #71008d;
  color: white;
}

.Career {
  background-color: #8d006e;
  color: white;
}
</style>
