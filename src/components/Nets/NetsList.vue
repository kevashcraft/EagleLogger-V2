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
              <v-list-tile v-else avatar :key="net.id" @click="">
                <v-list-tile-avatar>
                  <img :src="net.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-text="net.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-text="net.title"></v-list-tile-sub-title>
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
        all: false,
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
    mounted () {
      this.list()
    },
    methods: {
      list () {
        console.log('this.all', this.all)
        let req = {}
        if (this.all) req.all = true

        this.$root.req('Nets:list', req).then(response => {
          this.nets = response
        })
      }
    }
  }
</script>
