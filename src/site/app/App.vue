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
        <v-btn @click="$refs.UserSignUpDialog.open()">Sign Up</v-btn>
        <v-btn @click="$refs.AuthLoginDialog.open()">Login</v-btn>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="blue">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <user-sign-up-dialog ref="UserSignUpDialog"></user-sign-up-dialog>
    <auth-login-dialog ref="AuthLoginDialog"></auth-login-dialog>
  </v-app>
</template>

<script>
  import AuthLoginDialog from '@/components/Auth/AuthLoginDialog'
  import UserSignUpDialog from '@/components/Users/UserSignUpDialog'

  export default {
    components: {
      AuthLoginDialog,
      UserSignUpDialog
    },
    data () {
      return {
        title: 'EagleLogger',
        drawer: null
      }
    }
  }
</script>

