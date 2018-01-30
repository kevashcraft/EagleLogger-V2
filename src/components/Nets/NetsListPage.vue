<template>
  <v-container fluid style="height: 100%; padding: 0; overflow-y: scroll">
    <v-layout row wrap justify-space-around style="padding: 20px 0; height: 100px">
      <v-flex xs12 md8>
        <v-card>
          <v-card-title>
            <h3 class="headline">Radio Nets</h3>
          </v-card-title>
          <v-card-text>
            <p class="body-1">
              This is the list of all of the nets, both active and closed.
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs11 md8>
        <v-card flat color="blue darken-3" class="v-card-parent shepherd-nets-list" style="margin-top: 35px; margin-bottom: 35px">
          <v-card-text>
            <v-card class="v-card-child">
              <v-card-title>
                <v-layout center-align>
                  <h3>List of Nets <small style="font-weight: normal">(click on a net to open it)</small></h3>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <nets-list ref="NetList" all></nets-list>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <net-start-dialog ref="NetStartDialog" @update="$refs.NetList.list()"></net-start-dialog>
    <v-btn fab absolute bottom right color="orange" @click="$refs.NetStartDialog.open({action: 'create'})" dark style="bottom: 25px; right: 25px" v-show="user.ncs">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
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
