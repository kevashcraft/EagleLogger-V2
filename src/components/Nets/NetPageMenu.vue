<template>
  <v-menu bottom left
    transition="slide-y-transition"
    dark
    v-show="net.ncsId === token.userId"
    >
    <v-btn icon slot="activator" dark>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile @click="$root.page.$refs.NetStopDialog.open(net.id)" v-show="!net.stopped">
        <v-list-tile-title style="width: 150px">Close Net</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$root.page.$refs.NetReopenDialog.open(net.id)" v-show="net.stopped">
        <v-list-tile-title style="width: 150px">Reopen Net</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    // created () {
    //   console.log('$root.page.$refs', $root.page.$refs)
    // },
    computed: mapState(['net', 'token']),
  }
</script>
