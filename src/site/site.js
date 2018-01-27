import Vue from 'vue'
import Vuetify from 'vuetify'

import App from './app/App.vue'
import data from './app/data.js'
import methods from './app/methods.js'
import mounted from './app/mounted.js'
import router from './app/router.js'
import store from './app/store.js'
import './app/imports'

console.log('CORDOVA', CORDOVA)
if (CORDOVA) {
  console.log('hello!!')
  document.addEventListener('deviceready', () => {
    console.log('READY!')
    cordova.plugins.notification.local.schedule({
      title: 'My first notification',
      text: 'Is there an icon?',
      icon: 'file:///android_asset/www/favicon-24.png',
      foreground: true
    })
  }, false)
} else {
  console.log('NOT CORD')
}

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
