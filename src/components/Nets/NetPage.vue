<template>
  <v-container fluid style="height: 100%; padding: 0" class="net-page">
    <div class="flex-container">
      <div>
        <p class="display-1" style="position: absolute; top: 50%; left: 50%; width: 300px; margin-left: -150px; height: 100px; line-height: 50px; margin-top: -50px; text-align: center; opacity: 0.1">{{ net.name }}<br><small>{{ checkinCount }} checkins</small></p>
        <v-list class="list" ref="list">
          <template v-for="checkin, index in checkins">
            <v-list-tile :key="checkin.id" class="item">
              <v-list-tile-content>
                <v-list-tile-title v-text="(index + 1) + ' - ' + checkin.title"></v-list-tile-title>
                <v-list-tile-sub-title v-text="checkin.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-menu left
                class="menu"
                v-show="!net.stopped && net.ncsId === token.userId"
                >
                <v-btn icon slot="activator">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile @click="$refs.CallsignDialog.open(checkin.callsignId)">
                    <v-list-tile-title><v-icon>mdi-account-edit</v-icon> Edit {{ checkin.callsign }}</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="deleteCheckin(checkin.id)">
                    <v-list-tile-title><v-icon>mdi-delete</v-icon> Delete Checkin</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-list-tile>
          </template>
        </v-list>
        <v-btn dark fab absolute bottom right @click="$refs.CheckinDialog.open()" v-show="!net.stopped && net.ncsId === token.userId">
          <v-icon dark>mdi-account-check</v-icon>
        </v-btn>
      </div>
      <chat-box :net-id="net.id"></chat-box>
    </div>
    <callsign-dialog ref="CallsignDialog"></callsign-dialog>
    <checkin-dialog ref="CheckinDialog" :net-id="net.id"></checkin-dialog>
  </v-container>
</template>

<style lang="scss">
  .net-page {
    .menu {
      opacity: 0;
    }
    .item:hover {
      background: rgba(0, 0, 0, .45);
      .menu {
        opacity: 1;
      }
    }
    .flex-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      > div {
        position: relative;
        flex: 2 100px;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        &:first-of-type {
          flex: 1 50px;
          border-bottom: 3px solid rgba(0, 0, 0, .05);
          > ul {
            // background: rgba(0, 0, 0, .01)
          }
        }
        > ul {
          overflow-y: auto;
          flex: 1 100px;
        }
      }
    }
  }
</style>

<script>
  import CallsignDialog from '../Callsigns/CallsignDialog'
  import ChatBox from '../Chat/ChatBox'
  import CheckinDialog from '../Checkins/CheckinDialog'

  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        checkins: []
      }
    },
    computed: {
      checkinCount () {
        return this.checkins.length
      },
      ...mapState(['net', 'token'])
    },
    components: { CallsignDialog, ChatBox, CheckinDialog },
    created () {
      if (!this.net) {
        this.$store.commit('netSet', {})
      }
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
      console.log('hello!')
      this.retrieveNet(true)
    },
    beforeDestroy () {
      this.$root.$off('NetsUpdated')
      this.$root.$off('CheckinsUpdated')
    },
    methods: {
      deleteCheckin (id) {
        this.$root.req('Checkins:delete', {id, netId: this.net.id}).then(response => {
          this.retrieveCheckins()
        })
      },
      retrieveNet () {
        this.$root.req('Nets:retrieve', this.net).then(response => {
          this.$store.commit('netSet', response)
          this.retrieveCheckins()
        })
      },
      retrieveCheckins (scroll = false) {
        this.$root.req('Checkins:list', this.net).then(response => {
          let list = this.$refs.list.$el
          scroll = list.scrollTop === list.scrollHeight - list.offsetHeight
          // if (!scroll) {
          // }
          this.checkins = response
          this.$nextTick(() => {
            list.scrollTop = list.scrollHeight
          })
          if (scroll) {
          }
        })
      }
    }
  }
</script>
