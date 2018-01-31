<template>
  <v-menu bottom left
    transition="slide-y-transition"
    dark
    :style="{opacity: net.ncsId === user.callsignId ? 1 : 0}"
    >
    <v-btn icon slot="activator" dark>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile @click="$root.page.$refs.NetStopDialog.open()" v-show="!net.stopped">
        <v-list-tile-title style="width: 150px">
          <v-icon>mdi-door-closed</v-icon>
          <span>Close Net</span>
        </v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$root.page.$refs.NetReopenDialog.open()" v-show="net.stopped">
        <v-list-tile-title style="width: 150px">
          <v-icon>mdi-door-open</v-icon>
          <span>Reopen Net</span>
        </v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$root.page.$refs.NetDeleteDialog.open()">
        <v-list-tile-title style="width: 150px">
          <v-icon>mdi-delete</v-icon>
          <span>Delete Net</span>
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: mapState(['net', 'user']),
  }
</script>
