<template>
  <v-dialog v-model="opened">
    <v-card>
      <v-card-title center>Close the Net</v-card-title>
      <v-card-text>
        <v-form>
          <v-time-picker
            label="Ending time"
            placeholder="Net end time"
            v-model="net.stopTime"
          ></v-time-picker>
          <v-btn @click="update">Close Net</v-btn>
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
        net: {id: null, stopTime: null}
      }
    },
    created () {
      this.netEmpty = JSON.stringify(this.net)
    },
    methods: {
      afterOpen (netId) {
        this.clear(netId)
      },
      clear (netId) {
        let net = JSON.parse(this.netEmpty)
        net.id = netId
        net.stopTime = moment().format('HH:MM')
        this.net = net
      },
      update () {
        this.$root.req('Nets:stop', this.net).then(response => {
          this.close()
        })
      }
    }
  }
</script>
