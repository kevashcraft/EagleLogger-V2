import Vue from 'vue'
import Router from 'vue-router'

import AboutPage from '../../components/About/AboutPage.vue'
import HomePage from '../../components/Home/HomePage.vue'
import RouterView from '../../components/Misc/RouterView.vue'
import NetPage from '../../components/Nets/NetPage.vue'
import NetListPage from '../../components/Nets/NetListPage.vue'

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
