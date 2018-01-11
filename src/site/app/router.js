import Vue from 'vue'
import Router from 'vue-router'

import AboutPage from './components/AboutPage.vue'
import HomePage from './components/HomePage.vue'
import RouterView from './components/RouterView.vue'
import NetPage from './components/NetPage.vue'
import NetListPage from './components/NetListPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HomePage
    }, {
      path: '/about',
      component: AboutPage
    }, {
      path: '/nets',
      component: RouterView,
      children: [
        { path: '', component: NetListPage },
        { path: ':id', component: NetPage }
      ]
    }
  ],
  mode: 'history'
})
