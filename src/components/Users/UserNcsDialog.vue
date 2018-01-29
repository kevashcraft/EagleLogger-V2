<template>
  <v-dialog v-model="opened" max-width="400px">
    <v-card>
      <v-card-title class="title flex-center">Create NCS</v-card-title>
      <v-card-text>
        <p class="body-1">
          Upgrading {{ callsign.callsign }} to be a Net Control Station would allowing them to create nets and modify other callsigns.
        </p>
        <p class="body-2 text-xs-center">
          Would you like to upgrade {{ callsign.callsign }}?
        </p>
        <v-form @submit.prevent="upgrade">
          <v-layout justify-space-between>
            <v-btn flat left @click="close">close</v-btn>
            <v-btn color="primary" type="submit">
              <v-icon left>mdi-key-plus</v-icon>
              <span>Upgrade to NCS</span>
            </v-btn>
          </v-layout>
          <div class="text-xs-right">
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import Dialog from '@/components/Mixins/Dialog'

  export default {
    mixins: [Dialog],
    data () {
      return {
        callsign: {}
      }
    },
    created () {
      this.callsignEmpty = JSON.stringify(this.callsign)
    },
    methods: {
      afterOpen (callsign) {
        this.callsign = callsign
      },
      upgrade () {
        this.$root.req('Users:upgrade', this.callsign).then(response => {
          this.close()
          this.$store.dispatch('snackbar', {text: `${this.callsign.callsign} has been made an NCS.`})
        })
      }
    }
  }
</script>
