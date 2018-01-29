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
  import Dialog from '@/components/Mixins/Dialog'

  export default {
    mixins: [Dialog],
    data () {
      return {
        net: {}
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
        this.net = net
      },
      update () {
        this.$root.req('Nets:reopen', this.net).then(response => {
          this.close()
        })
      }
    }
  }
</script>
