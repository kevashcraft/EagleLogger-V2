import Vue from 'vue'
import Router from 'vue-router'

import AboutPage from '@/components/About/AboutPage'
import AuthActivationPage from '@/components/Auth/AuthActivationPage'
import HomePage from '@/components/Home/HomePage'
import NetPage from '@/components/Nets/NetPage'
import NetPageMenu from '@/components/Nets/NetPageMenu'
import NetsListPage from '@/components/Nets/NetsListPage'
import NetTypesListPage from '@/components/NetTypes/NetTypesListPage'
import PlaceholderMenu from '@/components/Misc/PlaceholderMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        page: HomePage, menu: PlaceholderMenu
      }
    }, {
      path: '/about',
      components: { page: AboutPage, menu: PlaceholderMenu }
    }, {
      path: '/activate',
      components: { page: AuthActivationPage, menu: PlaceholderMenu },
      props: true,
      children: [
        { path: ':userId',
          components: {
            page: AuthActivationPage,
            menu: PlaceholderMenu
          }
        },
        { path: ':userId/:code',
          components: {
            page: AuthActivationPage,
            menu: PlaceholderMenu
          }
        }
      ]
    }, {
      path: '/nets',
      components: { page: NetsListPage, menu: PlaceholderMenu }
    }, {
      path: '/nets/:id',
      components: { page: NetPage, menu: NetPageMenu }
    }, {
      path: '/net-types',
      components: { page: NetTypesListPage, menu: PlaceholderMenu }
    }
  ],
  mode: 'history'
})
