<template>
  <v-dialog v-model="opened">
    <v-card>
      <v-card-title center>Checkin</v-card-title>
      <v-card-text>
        <v-select
          label="Callsign"
          autocomplete
          clearable
          placeholder="Search for a callsign"
          return-object
          :items="searchResults"
          :search-input.sync="searchInput"
          v-model="callsign"
          ref="search"
        ></v-select>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        opened: false,
        callsign: {},
        searchResults: [],
        searchInput: null,
      }
    },
    props: {
      netId: Number
    },
    watch: {
      searchInput (query) {
        if (query) {
          this.$root.req('Callsigns:search', {query}).then(response => {
            this.searchResults = response
          })
        }
      },
      callsign (callsign) {
        if (callsign.id) {
          this.searchInput = null
          this.callsign = {}
          this.create(callsign.id)
        }
      },
    },
    methods: {
      open () {
        this.opened = true
        setTimeout(() => {
          this.$refs.search.focus()
        }, 1250)
      },
      create (callsignId) {
        let req = {netId: this.netId, callsignId}
        this.$root.req('Checkins:create', req).then(response => {
        })
      },
    }
  }
</script>
