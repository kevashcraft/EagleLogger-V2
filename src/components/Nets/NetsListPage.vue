<template>
  <v-container justify-space-around>
    <v-layout row justify-space-around>
      <v-flex xs12 md8 lg6>
        <nets-list all></nets-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import NetsList from './NetsList.vue'

  export default {
    data () {
      return {}
    },

    components: {
      NetsList
    }
  }
</script>
