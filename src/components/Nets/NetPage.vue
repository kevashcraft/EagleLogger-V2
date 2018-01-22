<template>
  <v-container>
    <div>{{ net.name }} - {{ net.title }} <v-btn @click="$refs.NetStopDialog.open(net.id)" v-show="!net.stopped">Close Net</v-btn><v-btn @click="$refs.NetReopenDialog.open(net.id)" v-show="net.stopped">Re-open Net</v-btn></div>
    <v-list style="max-height: 500px; overflow-y: auto" class="list">
      <template v-for="checkin in checkins">
        <v-list-tile :key="checkin.id" class="item">
          <v-list-tile-content>
            <v-list-tile-title v-text="checkin.callsign"></v-list-tile-title>
            <v-list-tile-sub-title v-text="checkin.title"></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action class="delete">
            <v-btn icon @click="deleteCheckin(checkin.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
    <checkin-dialog ref="CheckinDialog" :net-id="net.id"></checkin-dialog>
    <net-stop-dialog ref="NetStopDialog"></net-stop-dialog>
    <net-reopen-dialog ref="NetReopenDialog"></net-reopen-dialog>
    <v-btn daark fab absolute right @click="$refs.CheckinDialog.open()" v-show="!net.stopped && net.ncsId === token.userId">
      <v-icon dark>mdi-account-check</v-icon>
    </v-btn>
  </v-container>
</template>

<style lang="scss">
  .delete {
    opacity: 0;
  }
  .item:hover {
    background: rgba(0,0,0,.45);
    .delete {
      opacity: 1;
    }
  }
</style>

<script>
  import CheckinDialog from '../Checkins/CheckinDialog'
  import NetReopenDialog from './NetReopenDialog'
  import NetStopDialog from './NetStopDialog'

  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        net: {id: 0},
        checkins: [],
      }
    },
    computed: mapState(['token']),
    components: { CheckinDialog, NetReopenDialog, NetStopDialog },
    created () {
      this.$root.$on('NetsUpdated', (data) => {
        if (data = this.net.id) {
          this.retrieveNet()
        }
      })
      this.$root.$on('CheckinsUpdated', (data) => {
        if (data = this.net.id) {
          this.retrieveCheckins()
        }
      })
    },
    mounted () {
      console.log('this.token', this.token)
      this.net.id = parseInt(this.$route.params.id)
      this.retrieveNet()
    },
    beforeDestroy () {
      this.$root.$off('NetsUpdated')
      this.$root.$off('CheckinsUpdated')
    },
    methods: {
      deleteCheckin (id) {
        this.$root.req('Checkins:delete', {id}).then(response => {
          this.retrieveCheckins()
        })
      },
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
