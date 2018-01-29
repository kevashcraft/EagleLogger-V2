<template>
  <v-container justify-space-around>
    <v-layout row justify-space-around>
      <v-flex xs12 md8 lg6>
        <net-types-list ref="NetTypesList"></net-types-list>
      </v-flex>
    </v-layout>
    <net-type-dialog ref="NetTypeDialog"></net-type-dialog>
    <v-btn fab absolute right @click="$refs.NetTypeDialog.open('create')" dark>
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
