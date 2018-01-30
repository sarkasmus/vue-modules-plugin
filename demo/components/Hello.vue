<template>
  <div class="hello">
    <h2>welcome</h2>
    <h1>{{ exampleModule.msg }}</h1>
    <p>
      <button @click="exampleModule.emitEvent()">This button emits event (look for events at vue devtools)</button>
    </p>
    <p>
      this method returns message from Vuex store: {{ exampleModule.getStoreProperty() }}
    </p>
    <p>
      this is from data() function: {{ exampleModule.propData }}
    </p>
  </div>
</template>

<script>
import ExampleModule from '../modules/example-module'

export default {
  name: 'ello',
  modules: [
      ExampleModule
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
