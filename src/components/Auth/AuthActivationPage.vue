<template>
  <v-container justify-space-around>
    <v-layout row justify-space-around>
      <v-flex xs12 md8 lg6>
        <p v-show="!activated">Activating your account..</p>
        <p v-show="activated">Thanks for activating your account!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        activated: false
      }
    },
    mounted () {
      this.activate()
    },
    methods: {
      activate () {
        let userId = this.$route.params.userId
        let code = this.$route.params.code
        this.$root.req('Auth:activate', {userId, code}).then(response => {
          if (response) {
            this.$store.dispatch('login', {userId, code})
            this.$store.dispatch('snackbar', {text: 'Thanks for activating your account!'})
            this.activated = true
            this.$router.push('/')
          }
        })
      }
    }

  }
</script>
