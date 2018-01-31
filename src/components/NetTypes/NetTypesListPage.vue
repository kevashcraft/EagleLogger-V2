<template>
  <v-container fluid style="height: 100%; padding: 0; overflow-y: scroll">
    <v-layout row wrap justify-space-around style="padding: 20px 0; height: 100px">
      <v-flex xs12 md8>
        <v-card>
          <v-card-title>
            <h3 class="headline">Radio Net Types</h3>
          </v-card-title>
          <v-card-text>
            <p class="body-1">
              The Net Types are the templates that individual nets are created from and contain information such as the frequency, start time, and type.
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs11 md8>
        <v-card flat color="blue darken-3" class="v-card-parent shepherd-net-types" style="margin-top: 35px; margin-bottom: 35px">
          <v-card-text>
            <v-card class="v-card-child">
              <v-card-title>
                <h3>List of Net Types <small style="font-weight: normal">(click on a net type to edit it)</small></h3>
              </v-card-title>
              <v-card-text>
                <net-types-list ref="NetTypesList"></net-types-list>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <net-type-dialog ref="NetTypeDialog"></net-type-dialog>
    <v-btn fab absolute bottom right color="orange" @click="$refs.NetTypeDialog.open({action: 'create'})" dark style="bottom: 25px; right: 25px" v-show="user.ncs">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  import Page from '@/components/Mixins/Page'
  import NetTypeDialog from './NetTypeDialog.vue'
  import NetTypesList from './NetTypesList.vue'

  import { mapState } from 'vuex'

  export default {
    mixins: [Page],
    components: {
      NetTypeDialog,
      NetTypesList
    },
    data () {
      return {}
    },
    computed: mapState(['user'])
  }
</script>
