<template>
  <base-container title="Vuex"></base-container>
  <the-counter></the-counter>
  <h3>count is {{ $store.state.counter }}</h3>
  <button @click="addOne">Add 10</button>
  <change-counter></change-counter>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import ChangeCounter from './components/ChangeCounter.vue';
import TheCounter from './components/TheCounter.vue';

export default {
  components: {
    BaseContainer,
    ChangeCounter,
    TheCounter,
  },

  methods: {
    addOne() {
      // this.$store.commit('incrementBy', { data: 10 });
      this.$store.dispatch('increment', { data: 10 });
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
