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
          :filter="searchFilter"
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
          if (this.searching) clearTimeout(this.searching)
          this.searching = setTimeout(() => {
            let t = Date.now()
            this.$root.req('Callsigns:search', {query, t}).then(response => {
              if (response.t === t) {
                this.searchResults = response.results
              }
              this.searching = false
            })
          }, 250)
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
      searchFilter (item, queryText, itemText) {
        // const hasValue = val => val != null ? val : ''

        // const text = hasValue(itemText)
        // const query = hasValue(queryText)

        // return text.toString()
        //   .toLowerCase()
        //   .indexOf(query.toString().toLowerCase()) > -1
        //           console.log('item', item)
        // console.log('queryText', queryText)
        // console.log('itemText', itemText)
        return true
      }
    }
  }
</script>
