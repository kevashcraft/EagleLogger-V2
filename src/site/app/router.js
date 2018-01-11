import Vue from 'vue'
import Router from 'vue-router'

import AboutPage from './AboutPage.vue'
import HomePage from './HomePage.vue'
import RouterView from './RouterView.vue'
import NetPage from './NetPage.vue'
import NetListPage from './NetListPage.vue'

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
