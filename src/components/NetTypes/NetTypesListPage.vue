<template>
  <v-container fluid style="height: 100%; padding: 0; overflow-y: scroll">
    <v-layout row justify-space-around style="padding: 20px 0; height: 100px">
      <v-flex xs12 md8 lg6>
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
        <v-card style="margin-top: 48px">
          <v-card-title>
            <h3>List of Net Types <small style="font-weight: normal">(click on a net type to edit it)</small></h3>
          </v-card-title>
          <v-card-text>
            <net-types-list ref="NetTypesList"></net-types-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <net-type-dialog ref="NetTypeDialog"></net-type-dialog>
    <v-btn fab absolute bottom right @click="$refs.NetTypeDialog.open({action: 'create'})" dark style="bottom: 25px; right: 25px">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  import Page from '@/components/Mixins/Page'
  import NetTypeDialog from './NetTypeDialog.vue'
  import NetTypesList from './NetTypesList.vue'

  export default {
    mixins: [Page],
    data () {
      return {}
    },
    components: {
      NetTypeDialog,
      NetTypesList
    }
  }
</script>
