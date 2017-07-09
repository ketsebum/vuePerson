<template>
  <div class="hello">
    
    <p>{{ count }}</p>
    <b-button class="btn" @click="increment" variant="success">+</b-button>
    <b-button class="btn" @click="decrement" variant="inverse">-</b-button>
  </div>
</template>

<script>
  import {
      mapState
  } from 'vuex'

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  computed: mapState([
      // map this.count to store.state.count
      'count'
  ]),
  methods: {
    increment: function() {
        this.$store.commit("increment")
    },
    decrement: function() {
          this.$store.commit("decrement")
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
