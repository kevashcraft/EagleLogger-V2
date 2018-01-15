<template>
  <v-card color="blue" style="margin-top: 48px">
    <v-card-text>
      <v-card>
        <v-card-title v-show="title" v-text="title" style="font-size: 18px; font-weight: bold"></v-card-title>
        <v-card-text>
          <v-list style="max-height: 250px; overflow-y: auto">
            <template v-for="net in nets">
              <v-subheader v-if="net.header" v-text="net.header"></v-subheader>
              <v-divider v-else-if="net.divider" :inset="net.inset"></v-divider>
              <v-list-tile v-else :key="net.id" @click="gotoNet(net.id)">
                <v-list-tile-content>
                  <v-list-tile-title v-text="net.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-text="net.subtitle"></v-list-tile-sub-title>
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
        nets: [],
        thing: ['something']
      }
    },
    props: {
      all: {
        default: false,
        type: Boolean
      },
      title: {
        default: null,
        type: String
      }
    },
    created () {
      this.$root.$on('NetsUpdated', (data) => {
        this.list()
      })
    },
    mounted () {
      this.list()
    },
    methods: {
      list () {
        let req = {}
        if (this.all) req.all = true

        this.$root.req('Nets:list', req).then(response => {
          this.nets = response
        })
      },
      gotoNet (netId) {
        this.$router.push(`nets/${netId}`)
      }
    }
  }
</script>
