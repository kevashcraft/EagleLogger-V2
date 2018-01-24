<template>
  <div>
    <v-btn @click="$refs.NetStopDialog.open(net.id)" v-show="!net.stopped">Close Net</v-btn>
    <v-btn @click="$refs.NetReopenDialog.open(net.id)" v-show="net.stopped">Re-open Net</v-btn>
    <net-stop-dialog ref="NetStopDialog"></net-stop-dialog>
    <net-reopen-dialog ref="NetReopenDialog"></net-reopen-dialog>
  </div>
</template>

<script>
  import NetReopenDialog from './NetReopenDialog'
  import NetStopDialog from './NetStopDialog'
  import { mapState } from 'vuex'

  export default {
    computed: mapState(['net', 'token']),
    components: { NetReopenDialog, NetStopDialog },
  }
</script>
