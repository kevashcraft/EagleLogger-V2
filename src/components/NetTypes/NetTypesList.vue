<template>
  <v-card color="blue">
    <v-card-text>
      <v-card>
        <v-card-text>
          <v-list style="max-height: 250px; overflow-y: auto">
            <template v-for="netType in netTypes">
              <v-list-tile :key="netType.id" @click="$root.page.$refs.NetTypeDialog.open({action: 'update', netTypeId: netType.id})">
                <v-list-tile-content>
                  <v-list-tile-title v-text="netType.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-text="netType.desription"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        netTypes: []
      }
    },
    created () {
      this.$root.$on('NetTypesUpdated', (data) => {
        this.list()
      })
    },
    mounted () {
      this.list()
    },
    beforeDestroy () {
      this.$root.$off('NetTypesUpdated')
    },
    methods: {
      list () {
        this.$root.req('NetTypes:list').then(response => {
          this.netTypes = response
        })
      }
    }
  }
</script>
