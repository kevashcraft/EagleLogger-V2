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
          <v-layout row align-center>
            <v-flex xs6>
              <v-menu bottom left
                transition="slide-y-transition"
                dark
                >
                <v-btn slot="activator" flat dark>
                  <v-icon>mdi-menu-down</v-icon>
                  <h4 style="font-size: 16px">{{ user.callsign }}</h4>
                </v-btn>
                <v-list>
                  <v-list-tile @click="$store.dispatch('logout')" v-show="token.authed">
                    <v-list-tile-title><v-icon left>mdi-logout-variant</v-icon> Logout</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a @click="$refs.UserSettingsDialog.open()" class="hover-white">
                <v-icon style="font-size: 16px">mdi-settings</v-icon>
                <span style="line-height: 16px">My Settings</span>
              </a>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-text class="flex-center" style="display: flex" v-show="!token.authed">
          <v-btn @click="$refs.UserSignUpDialog.open()" color="primary" style="flex: 1"><v-icon left>mdi-account-plus</v-icon> Sign Up</v-btn>
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
        <router-link to="/net-types" :class="{'current-page': $route.path === '/net-types'}" v-show="user.ncs" class="wt">
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
      <v-card style="margin-top: 10px;" class="grey darken-4">
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 class="flex-center">
              <v-btn color="orange white--text" @click="walkthrough"><v-icon left>mdi-walk</v-icon>Walkthrough</v-btn>
            </v-flex>
            <v-flex xs12 class="flex-center" style="margin: 15px" v-show="token.authed">
              <v-btn color="blue lighten-2 white--text" @click="$refs.FeedbackDialog.open()"><v-icon left>mdi-help-network</v-icon>Feedback/Support</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-toolbar app class="blue darken-3">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" dark></v-toolbar-side-icon>
      <v-spacer></v-spacer>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-view name="menu"></router-view>
    </v-toolbar>
    <v-content>
      <transition name="slide-y-transition" mode="out-in">
        <router-view name="page"></router-view>
      </transition>
    </v-content>
    <feedback-dialog ref="FeedbackDialog"></feedback-dialog>
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
    font-size: 16px !important;
  }
  .hover-white {
    transition: color .2s ease;
  }
  .hover-white:hover {
    color: white !important;
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
    font-size: 28px !important;
    color: white !important;
  }
  .main-menu li:hover a {
    /*color: blue !important;*/
  }
</style>

<script>
  import AuthLoginDialog from '@/components/Auth/AuthLoginDialog'
  import FeedbackDialog from '@/components/Feedback/FeedbackDialog'
  import UserResetPasswordDialog from '@/components/Users/UserResetPasswordDialog'
  import UserSettingsDialog from '@/components/Users/UserSettingsDialog'
  import UserSignUpDialog from '@/components/Users/UserSignUpDialog'
  import Vue from 'vue'

  import { mapState } from 'vuex'
  import Shepherd from 'tether-shepherd'

  export default {
    components: {
      AuthLoginDialog,
      FeedbackDialog,
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
    mounted () {
      this.tour = new Shepherd.Tour({
        defaults: {
          classes: 'shepherd-theme-arrows'
        }
      })

      this.tour.addStep('Home', {
        title: 'EagleLogger Walkthrough',
        text: "Welcome to EagleLogger! Let's walk through the basics.",
        attachTo: '.wt-testing bottom',
        advanceOn: '.docs-link click',
        buttons: [
          {
            text: 'Next',
            action: () => {
              this.$router.push('/nets')
              setTimeout(() => {
                this.tour.next()
              }, 500)
            }
          }
        ]
      })
      this.tour.addStep('Nets', {
        title: 'Net Lists',
        text: "Welcome to EagleLogger! Let's walk through the basics.",
        attachTo: '.wt-testing bottom',
        advanceOn: '.docs-link click',
        buttons: [
          {
            text: 'Next',
            action: () => {
              this.$router.push('/nets')
                this.tour.next()
              // setTimeout(() => {
              // }, 500)
            }
          }
        ]
      })
    },
    methods: {
      dialog (ref) {
        this.$refs[ref].open()
      },
      walkthrough () {
        let currentPage = this.$route.path
        this.$router.push(`/`)
        this.tour.on('complete', () => {this.$router.push(currentPage)})
        this.tour.on('cancel', () => {this.$router.push(currentPage)})

        setTimeout(() => {
          this.tour.start()
        }, 500)

      }
    }
  }
</script>

