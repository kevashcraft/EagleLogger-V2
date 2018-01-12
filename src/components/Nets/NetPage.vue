<template>
  <v-container>
    <div>{{ net.name }} - {{ net.title }}</div>
    <v-list style="max-height: 750px; overflow-y: auto">
      <template v-for="checkin in checkins">
        <v-list-tile :key="checkin.id">
          <v-list-tile-content>
            <v-list-tile-title v-text="checkin.callsign"></v-list-tile-title>
            <v-list-tile-sub-title v-text="checkin.title"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>

  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        net: {},
        checkins: [],
      }
    },
    mounted () {
      this.net.netId = this.$route.params.id
      this.retrieveNet()
    },

    methods: {
      retrieveNet () {
        this.$root.req('Nets:retrieve', this.net).then(response => {
          this.net = response
          this.retrieveCheckins()
        })
      },
      retrieveCheckins () {
        this.$root.req('Checkins:list', this.net).then(response => {
          this.checkins = response
        })
      }
    }
  }
</script>
