<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello @clicked="exampleModule.eventHandle($event)"></hello>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import ExampleModule from './modules/example-module'

export default {
  name: 'app',
  modules: [
      ExampleModule
  ],
  components: {
    Hello
  }
}
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

h1, h2 {
  font-weight: normal;
}

a {
  color: #333;
}

</style>
