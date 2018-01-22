import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [ persistedState() ],
  state: {
    modal: '',
    modalStack: [],
    token: {authed: false},
    user: {}
  },
  mutations: {
    modalSet (state, modal) {
      state.modal = modal
    },
    modalStackPush (state, modal) {
      if (state.modalStack.indexOf(modal) < 0) {
        state.modalStack.push(modal)
      }
    },
    modalStackSet (state, stack) {
      state.modalStack = stack
    },
    modalStackSplice (state, index) {
      state.modalStack.splice(index, 1)
    },
    tokenSet (state, token) {
      state.token = token
    },
    userSet (state, user) {
      state.user = user
    }
  },
  actions: {
    login ({commit}, token) {
      let v = {authed: true, ...token}
      console.log('v', v)
      commit('tokenSet', {authed: true, ...token})
    },
    logout ({commit}) {
      commit('tokenSet', {authed: false})
    },
    modalClear ({ commit, state }) {
      commit('modalSet', '')
      commit('modalStackSet', [])
    },
    modalOpen ({ commit, state }, modal) {
      // remove if in the stack
      let prevIndex = state.modalStack.indexOf(modal)
      if (prevIndex > -1) commit('modalStackSplice', prevIndex)

      commit('modalSet', modal)
    },
    modalNext ({ commit, state }) {
      let modal = ''

      if (state.modalStack.length) {
        modal = state.modalStack[0]

        setTimeout(() => {
          commit('modalStackSplice', 0)
        }, 350)
      }

      commit('modalSet', modal)
    },
    modalSave ({ commit, state }, modal) {
      if (modal !== state.modal) {
        if (state.modal.length) {
          commit('modalStackPush', state.modal)
        }
        commit('modalSet', modal)
      } else {
        console.log("you're trying to save the wrong modal")
      }
    }
  }
})
