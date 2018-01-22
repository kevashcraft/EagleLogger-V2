<template>
  <v-container style="position: absolute; top: 50px; left: 0; right: 0; bottom: 0; padding: 0">
    <div class="flex-container">
      <div style="position: relative; display: flex; flex-direction: column; flex-stretch: 2">
        <div>{{ net.name }} - {{ net.title }} <v-btn @click="$refs.NetStopDialog.open(net.id)" v-show="!net.stopped">Close Net</v-btn><v-btn @click="$refs.NetReopenDialog.open(net.id)" v-show="net.stopped">Re-open Net</v-btn></div>
        <v-list style="overflow-y: auto" class="list" ref="list">
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
        <v-btn dark fab absolute bottom right @click="$refs.CheckinDialog.open()" v-show="!net.stopped && net.ncsId === token.userId">
          <v-icon dark>mdi-account-check</v-icon>
        </v-btn>
      </div>
      <chat-box :net-id="net.id"></chat-box>
    </div>
    <checkin-dialog ref="CheckinDialog" :net-id="net.id"></checkin-dialog>
    <net-stop-dialog ref="NetStopDialog"></net-stop-dialog>
    <net-reopen-dialog ref="NetReopenDialog"></net-reopen-dialog>
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
  .flex-container {
    height: 100%;
    display: flex;
    justify-content: stretch;
    flex-direction: column;
    > div {
      height: 100px;
      flex: 1;
    }
  }
</style>

<script>
  import ChatBox from '../Chat/ChatBox'
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
    components: { ChatBox, CheckinDialog, NetReopenDialog, NetStopDialog },
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
          let list = this.$refs.list
          let scroll = list.$el.scrollTop === list.$el.scrollHeight - list.$el.offsetHeight
          this.checkins = response
          if (scroll) {
            this.$nextTick(() => {
              list.$el.scrollTop = list.$el.scrollHeight
            })
          }
        })
      }
    }
  }
</script>
