<template>
  <v-dialog v-model="opened">
    <v-card>
      <v-card-title center>Re-open the Net</v-card-title>
      <v-card-text>
          <v-btn @click="update">Open</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        opened: false,
        net: {}
      }
    },
    created () {
      this.netEmpty = JSON.stringify(this.net)
    },
    methods: {
      open (netId) {
        this.opened = true
        this.clear(netId)
      },
      clear (netId) {
        let net = JSON.parse(this.netEmpty)
        net.id = netId
        this.net = net
      },
      close () {
        this.opened = false
      },
      update () {
        this.$root.req('Nets:reopen', this.net).then(response => {
          this.close()
        })
      }
    }
  }
</script>
