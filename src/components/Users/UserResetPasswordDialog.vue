<template>
  <v-dialog v-model="opened" max-width="400px">
    <v-card>
      <v-card-title class="title flex-center">Reset Password</v-card-title>
      <v-card-text>
        <p class="body-1">
          Type in your callsign to have a new password sent to your email address.
        </p>
        <v-form @submit.prevent="resetPassword">
          <v-text-field
            label="Callsign"
            placeholder="Your callsign"
            ref="autofocus"
            v-model="user.callsign"
          ></v-text-field>
          <v-layout justify-space-between>
            <v-btn flat left @click="close">close</v-btn>
            <v-btn color="primary" type="submit">
              <v-icon left>mdi-lock-reset</v-icon>
              <span>Reset</span>
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
          callsign: null
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
        }
        this.$nextTick(this.$refs.autofocus.focus)
      },
      resetPassword () {
        this.$root.req('Users:resetPassword', this.user).then(response => {
          this.$store.dispatch('snackbar', {text: `An new password has been sent to your email address.`})
          this.close()
        })
      }
    }
  }
</script>
