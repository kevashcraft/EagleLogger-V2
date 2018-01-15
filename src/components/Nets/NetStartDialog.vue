<template>
  <v-dialog v-model="opened">
    <v-card>
      <v-card-title center>Start a Net</v-card-title>
      <v-card-text>
        <v-form>
          <v-select
            label="Net"
            autocomplete
            clearable
            placeholder="Select a net to start"
            return-object
            item-text="name"
            :items="netTypes"
            v-model="net"
            ref="netSelect"
          ></v-select>
          <v-text-field
            label="Start time"
            placeholder="Net start time"
            type="time"
            v-model="net.startTime"
          ></v-text-field>
          <v-btn @click="create">Click</v-btn>
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
        netTypes: [],
        net: {}
      }
    },
    created () {
      this.netEmpty = JSON.stringify(this.net)
    },
    methods: {
      open () {
        this.opened = true
        this.clear()
        this.list()
      },
      clear () {
        this.net = JSON.parse(this.netEmpty)
      },
      close () {
        this.opened = false
      },
      create () {
        this.$root.req('Nets:create', this.net).then(response => {
          this.close()
        })
      },
      list () {
        this.$root.req('NetTypes:list').then(response => {
          this.netTypes = response
        })
      }
    }
  }
</script>
