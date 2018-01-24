import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [ persistedState() ],
  state: {
    net: {},
    snackbar: {},
    token: {authed: false},
    user: {}
  },
  mutations: {
    netSet (state, net) {
      state.net = net
    },
    snackbarSet (state, snackbar) {
      state.snackbar = snackbar
    },
    tokenSet (state, token) {
      state.token = token
    },
    userSet (state, user) {
      state.user = user
    }
  },
  actions: {
    login ({commit, state}, token) {
      let user = state.user
      user.callsign = token.callsign
      commit('userSet', user)
      commit('tokenSet', {authed: true, ...token})
    },
    logout ({commit}) {
      commit('tokenSet', {authed: false})
    },
    snackbar ({commit, state}, snackbar) {
      commit('snackbarSet', {})
      commit('snackbarSet', snackbar)
    }
  }
})
