<template>
  <v-app id="app">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <router-link to="/">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>mdi-home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/net-types">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>mdi-playlist-minus</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Net Types</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/nets">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>mdi-playlist-check</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Nets</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/about">
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>About</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <v-btn @click="$refs.UserSignUpDialog.open()" v-show="!token.authed">Sign Up</v-btn>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="blue">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left
        transition="slide-y-transition"
        >
        <v-btn icon slot="activator" dark>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="$refs.AuthLoginDialog.open()" v-show="!token.authed">
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="$store.dispatch('logout')" v-show="token.authed">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <user-sign-up-dialog ref="UserSignUpDialog"></user-sign-up-dialog>
    <auth-login-dialog ref="AuthLoginDialog"></auth-login-dialog>
    <v-snackbar
      top
      v-model="snackbarShow"
    >{{ snackbarText }}</v-snackbar>
  </v-app>
</template>

<script>
  import AuthLoginDialog from '@/components/Auth/AuthLoginDialog'
  import UserSignUpDialog from '@/components/Users/UserSignUpDialog'

  import { mapState } from 'vuex'

  export default {
    components: {
      AuthLoginDialog,
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
    computed: mapState(['token', 'snackbar']),
    watch: {
      snackbar (snackbar) {
        this.snackbarText = snackbar.text
        this.snackbarShow = true
      }
    }
  }
</script>

