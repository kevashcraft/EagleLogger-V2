<template>
  <v-app id="app">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      class="grey darken-3"
      light
      app
      style="height: 100vh; display: flex; flex-direction: column; padding-bottom: 0"
    >
      <v-card class="blue-grey darken-1 white--text">
        <v-card-title class="flex-center">
          <h1 style="font-size: 21px">EagleLogger</h1>
          <h4 style="font-weight: normal; font-size: 16px">An Amateur Radio Net Logger</h4>
        </v-card-title>
        <v-card-text v-show="token.authed">
          <v-layout row>
            <v-flex xs6>
              <h4 style="font-size: 16px">{{ user.callsign }}</h4>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a @click="$refs.UserSettingsDialog.open()">
                <v-icon style="font-size: 16px">mdi-settings</v-icon>
                <span style="line-height: 16px">My Settings</span>
              </a>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-text class="flex-center" style="display: flex" v-show="!token.authed">
          <v-btn @click="$refs.UserSignUpDialog.open()" v-show="!user.callsign" color="primary" style="flex: 1"><v-icon left>mdi-account-plus</v-icon> Sign Up</v-btn>
          <v-btn @click="$refs.AuthLoginDialog.open()" flat dark style="flex: 1"><v-icon left>mdi-account-key</v-icon> Login</v-btn>
        </v-card-text>
      </v-card>
      <v-list dense class="main-menu" style="flex: 1" two-line>
        <router-link to="/" :class="{'current-page': $route.path === '/'}">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>mdi-home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/net-types" :class="{'current-page': $route.path === '/net-types'}">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>mdi-playlist-minus</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Net Types</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/nets" :class="{'current-page': $route.path.substring(0,5) === '/nets'}">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>mdi-playlist-check</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Nets</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/about" :class="{'current-page': $route.path === '/about'}">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>About</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
      <v-card style="margin-top: 10px;" v-show="token.authed" class="grey darken-4">
        <v-card-text class="flex-center" style="display: flex">
          <router-view name="controls"></router-view>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-toolbar app class="blue darken-3">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" dark></v-toolbar-side-icon>
      <v-spacer></v-spacer>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left
        transition="slide-y-transition"
        dark
        >
        <v-btn icon slot="activator" dark>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="$refs.AuthLoginDialog.open()" v-show="!token.authed">
            <v-list-tile-title>Login <v-icon>mdi-account-key</v-icon></v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="$store.dispatch('logout')" v-show="token.authed">
            <v-list-tile-title>Logout <v-icon>mdi-logout-variant</v-icon></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <transition name="slide-y-transition" mode="out-in">
        <router-view name="page"></router-view>
      </transition>
    </v-content>
    <user-reset-password-dialog ref="UserResetPasswordDialog"></user-reset-password-dialog>
    <user-sign-up-dialog ref="UserSignUpDialog"></user-sign-up-dialog>
    <user-settings-dialog ref="UserSettingsDialog"></user-settings-dialog>
    <auth-login-dialog ref="AuthLoginDialog"></auth-login-dialog>
    <v-snackbar
      top
      v-model="snackbarShow"
    >{{ snackbarText }}</v-snackbar>
  </v-app>
</template>

<style type="scss">

  #app {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
  }
  .main-menu {
    margin-top: 25px;
  }
  .main-menu a {
    text-decoration: none;
    color: white !important;
    font-size: 18px !important;
  }
  .current-page a {
    color: #2196F3 !important;
  }
  .main-menu li > a:hover {
    background-color: rgba(255,255,255,.14) !important;
  }
  .main-menu li > a:hover i {
    color: #2196F3 !important;
  }
  .main-menu i {
    font-size: 32px !important;
    color: white !important;
  }
  .main-menu li:hover a {
    /*color: blue !important;*/
  }
</style>

<script>
  import AuthLoginDialog from '@/components/Auth/AuthLoginDialog'
  import UserResetPasswordDialog from '@/components/Users/UserResetPasswordDialog'
  import UserSettingsDialog from '@/components/Users/UserSettingsDialog'
  import UserSignUpDialog from '@/components/Users/UserSignUpDialog'
  import Vue from 'vue'

  import { mapState } from 'vuex'

  export default {
    components: {
      AuthLoginDialog,
      UserResetPasswordDialog,
      UserSettingsDialog,
      UserSignUpDialog
    },
    data () {
      return {
        title: 'EagleLogger',
        drawer: null,
        snackbarShow: false,
        snackbarText: null
      }
    },
    computed: mapState(['token', 'snackbar', 'user']),
    watch: {
      snackbar (snackbar) {
        this.snackbarText = snackbar.text
        this.snackbarShow = true
      }
    },
    beforeCreate () {
      Vue.prototype.$app = this
    },
    methods: {
      dialog (ref) {
        this.$refs[ref].open()
      }
    }
  }
</script>

