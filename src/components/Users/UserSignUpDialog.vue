<template>
  <v-dialog v-model="opened" max-width="450px">
    <v-card>
      <v-card-title class="title flex-center">Sign Up</v-card-title>
      <v-card-text>
        <p class="body-1">
          To create an account, enter your callsign and a good password.<br>
          <span style="text-decoration: line-through">An email will be sent to your <a href="http://www.arrl.org/e-mail-forwarding" target="_blank" rel="noreferrer noopener">ARRL email address</a> for confirmation.</span>. <strong>Open sign-ups are currently active!</strong>
        </p>
        <v-form @submit.prevent="create">
          <v-text-field
            label="Callsign"
            placeholder="Your callsign"
            ref="autofocus"
            v-model="user.callsign"
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="user.password"
            placeholder="Your new password"
          ></v-text-field>
          <v-text-field
            label="ARRL Email Address"
            v-model="arrlEmailAddress"
            disabled
            placeholder="Your ARRL email address"
          ></v-text-field>
          <v-layout justify-space-between>
            <v-btn flat left @click="close">close</v-btn>
            <v-btn type="submit" color="primary">
              <v-icon left>mdi-account-plus</v-icon>
              <span>Create Account</span>
            </v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

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
    computed: {
      arrlEmailAddress () {
        if (!this.user || !this.user.callsign) return null
        return this.user.callsign.toUpperCase() + '@arrl.net'
      }
    },
    watch: {
      'user.callsign' (callsign) {
        if (callsign !== callsign.toUpperCase()) {
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
        this.$nextTick(this.$refs.autofocus.focus)
      },
      create () {
        this.$root.req('Users:create', this.user).then(response => {
          this.close()
          // this.$store.dispatch('snackbar', {text: 'Account created! Check your email for the confirmation link.'})
          this.$root.req('Auth:create', this.user).then(response => {
            if (response.status) {
              this.$store.dispatch('login', {callsign: response.user.callsign, userId: response.user.id, code: response.code})
              this.$store.commit('userSet', response.user)
              this.$store.dispatch('snackbar', {text: `Welcome to the net <span class='orange--text'>${this.user.callsign}</span>!`})
              this.close()
            } else {
              this.$store.dispatch('snackbar', {text: `Invalid credentials.`})
            }
          })

        })
      }
    }
  }
</script>
