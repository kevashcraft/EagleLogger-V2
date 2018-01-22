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
    props: ['userId', 'code'],
    mounted () {
      this.activate()
    },
    methods: {
      activate () {
        this.$root.req('Auth:activate', {userId: this.userId, code: this.code}).then(response => {
          if (response) this.activated = true
        })
      }
    }

  }
</script>
