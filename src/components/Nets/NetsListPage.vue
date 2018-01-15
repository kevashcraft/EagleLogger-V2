<template>
  <v-container justify-space-around>
    <v-layout row justify-space-around>
      <v-flex xs12 md8 lg6>
        <nets-list ref="NetList" all></nets-list>
      </v-flex>
    </v-layout>
    <v-btn fab absolute right @click="$refs.NetStartDialog.open()" dark>
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <net-start-dialog ref="NetStartDialog" @update="$refs.NetList.list()"></net-start-dialog>
  </v-container>
</template>

<script>
  import NetStartDialog from './NetStartDialog.vue'
  import NetsList from './NetsList.vue'

  export default {
    data () {
      return {}
    },

    components: {
      NetStartDialog,
      NetsList
    }
  }
</script>
