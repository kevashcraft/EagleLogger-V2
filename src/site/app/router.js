import Vue from 'vue'
import Router from 'vue-router'

import AboutPage from '../../components/About/AboutPage.vue'
import AuthActivationPage from '../../components/Auth/AuthActivationPage.vue'
import HomePage from '../../components/Home/HomePage.vue'
import RouterView from '../../components/Misc/RouterView.vue'
import NetPage from '../../components/Nets/NetPage.vue'
import NetsListPage from '../../components/Nets/NetsListPage.vue'
import NetTypesListPage from '../../components/NetTypes/NetTypesListPage.vue'

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
      path: '/activate/:userId/:code',
      component: AuthActivationPage,
      props: true
    }, {
      path: '/nets',
      component: RouterView,
      children: [
        { path: '', component: NetsListPage },
        { path: ':id', component: NetPage }
      ]
    }, {
      path: '/net-types',
      component: NetTypesListPage
    }
  ],
  mode: 'history'
})
