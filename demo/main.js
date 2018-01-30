// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'

const vueModulesPlugin = process.env.NODE_ENV === 'development'
  ? require('../src/vue-modules-plugin.js')
  : require('../dist/vue-modules-plugin.js')

Vue.config.productionTip = false

// Using plugin
Vue.use(vueModulesPlugin)
Vue.use(vuex)

let store = new vuex.Store({
  state: {
    property: 'this property is from vuex store'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
