import Vue from 'vue'
import Vuetify from 'vuetify'

import App from './app/App.vue'
import data from './app/data.js'
import methods from './app/methods.js'
import mounted from './app/mounted.js'
import router from './app/router.js'
import store from './app/store.js'
import './app/imports'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  data,
  methods,
  mounted,
  router,
  store,
  render (h) { return h(App) }
})
