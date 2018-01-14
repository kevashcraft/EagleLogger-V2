<template>
  <v-container>
    <div>{{ net.name }} - {{ net.title }}</div>
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
    <checkin-dialog ref="CheckinDialog" @update="retrieveCheckins" :net-id="net.id"></checkin-dialog>
    <v-btn fab absolute right @click="$refs.CheckinDialog.open()" dark>
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

  export default {
    data () {
      return {
        net: {},
        checkins: [],
      }
    },
    components: { CheckinDialog },
    mounted () {
      this.net.id = this.$route.params.id
      this.retrieveNet()
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
