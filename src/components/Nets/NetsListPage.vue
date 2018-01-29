<template>
  <v-container justify-space-around>
    <v-layout row justify-space-around>
      <v-flex xs12 md8 lg6>
        <nets-list ref="NetList" all></nets-list>
      </v-flex>
    </v-layout>
    <v-btn fab absolute right @click="$refs.NetStartDialog.open()" dark v-show="user.ncs">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <net-start-dialog ref="NetStartDialog" @update="$refs.NetList.list()"></net-start-dialog>
  </v-container>
</template>

<script>
  import Page from '@/components/Mixins/Page'
  import NetStartDialog from './NetStartDialog.vue'
  import NetsList from './NetsList.vue'

  import { mapState } from 'vuex'

  export default {
    mixins: [Page],
    components: {
      NetStartDialog,
      NetsList
    },
    data () {
      return {}
    },
    computed: mapState(['user']),
    mounted () {
      console.log('this.user.ncs', this.user.ncs)
    }
  }
</script>
