<template>
  <v-dialog v-model="opened" max-width="400px" id="AuthLoginDialog">
    <v-card>
      <v-card-title class="title flex-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="create">
          <v-text-field
            label="Callsign"
            placeholder="Your callsign"
            ref="autofocus"
            v-model="user.callsign"
          ></v-text-field>
          <v-layout align-center>
            <v-flex xs8>
              <v-text-field
                label="Password"
                type="password"
                ref="password"
                v-model="user.password"
                placeholder="Your password"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-btn flat @click="$app.dialog('UserResetPasswordDialog')"><v-icon left>mdi-lock-reset</v-icon> Reset</v-btn>
            </v-flex>
          </v-layout>
          <v-layout justify-space-between>
            <v-btn flat left @click="close">close</v-btn>
            <v-btn color="primary" type="submit">
              <v-icon left>mdi-account-key</v-icon>
              <span>Login</span>
            </v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style>
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: 1px solid #fff;
    -webkit-text-fill-color: #000;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }
</style>

<script>
  import Dialog from '@/components/Mixins/Dialog'

  export default {
    mixins: [Dialog],
    data () {
      return {
        user: {
          callsign: null,
          password: null
        }
      }
    },
    watch: {
      'user.callsign' (callsign) {
        if (callsign && callsign !== callsign.toUpperCase()) {
          this.user.callsign = callsign.toUpperCase()
        }
      }
    },
    created () {
      this.userEmpty = JSON.stringify(this.user)
    },
    methods: {
      afterOpen () {
        this.user = JSON.parse(this.userEmpty)
        if (this.$store.state.user.callsign) {
          this.user.callsign = this.$store.state.user.callsign
          this.$nextTick(this.$refs.password.focus)
        } else {
          this.$nextTick(this.$refs.autofocus.focus)
        }
      },
      create () {
        this.$root.req('Auth:create', this.user).then(response => {
          if (response.status) {
            this.$store.dispatch('login', {callsign: response.user.callsign, userId: response.user.id, code: response.code})
            this.$store.commit('userSet', response.user)
            this.$store.dispatch('snackbar', {text: `Welcome to the net, ${this.user.callsign}!`})
            this.close()
          } else {
            this.$store.dispatch('snackbar', {text: `Invalid credentials.`})
          }
        })
      }
    }
  }
</script>
