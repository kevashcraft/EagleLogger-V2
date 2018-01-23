<template>
  <v-dialog v-model="opened" max-width="450px">
    <v-card>
      <v-card-title class="title flex-center">Checkin</v-card-title>
      <v-card-text>
        <v-select
          label="Callsign"
          autocomplete
          clearable
          placeholder="Search for a callsign"
          return-object
          debounce-search="500"
          :loading="searchLoading"
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
        searchLoading: false
      }
    },
    props: {
      netId: Number
    },
    watch: {
      searchInput (query) {
        if (query) {
          this.t = Date.now()
          this.searchLoading = true
          this.$root.req('Callsigns:search', {query, t: this.t}).then(response => {
            if (response.t === this.t) {
              if (window.innerHeight < 500) {
                this.searchResults = response.results.slice(0, 1)
              } else {
                this.searchResults = response.results
              }
              this.searchLoading = false
            }
          })
        } else {
          this.searchResults = []
        }
      },
      callsign (callsign) {
        if (callsign && callsign.id) {
          this.searchInput = null
          this.callsign = {}
          this.create(callsign.id)
        }
      },
    },
    methods: {
      open () {
        this.opened = true
        this.focusSearch()
      },
      create (callsignId) {
        let req = {netId: this.netId, callsignId}
        this.$root.req('Checkins:create', req).then(response => {
        })
      },
      focusSearch () {
        setTimeout(() => {
          let el = document.querySelector('.dialog__content.dialog__content__active .input-group--select__autocomplete')
          if (el) {
            el.click()
            el.focus()
          } else {
            this.focusSearch()
          }
        }, 250)
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
