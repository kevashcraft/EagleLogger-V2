// // import { mount } from 'avoriaz'
/* global describe, it, expect */
import Vue from 'vue'
import Vuetify from 'vuetify'
import NetsList from '@/components/Nets/NetsList'
// import NetsList from '../../../src/components/About/AboutPage.vue'

Vue.use(Vuetify)

describe('NetsList.vue', () => {
  it('has something in the thing', () => {
    const Constructor = Vue.extend(NetsList)
    const NetsListComponent = new Constructor().$mount()

    // const NetsListComponent = mount(NetsList)

    // expect(NetsListComponent.thing).to.contain('something')
  })
})
