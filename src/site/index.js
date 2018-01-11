import Vue         from 'vue'
import Vuetify     from 'vuetify'

import App         from './components/App.vue'
import router      from './components/router.js'

import '../../node_modules/vuetify/dist/vuetify.min.css'
import '../../node_modules/mdi/css/materialdesignicons.min.css'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  router,
  thing: 'this',
  render (h) { return h(App) }
})

