<template>
  <div id="app">
    <vueAlert></vueAlert>
    <h1>List of people with VueJS</h1>
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>

import vueAlert from './components/Alert.vue'

export default {
  name: 'app',
  components: {
      vueAlert
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
