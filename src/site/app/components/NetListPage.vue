<template>
  <v-container justify-space-around>
    <v-layout row justify-space-around>
      <v-flex xs12 md8 lg6>
        <e-net-list></e-net-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import ENetList from './ENetList.vue'

  export default {
    data () {
      return {}
    },

    components: {
      ENetList
    }
  }
</script>
