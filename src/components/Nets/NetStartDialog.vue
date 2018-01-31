<template>
  <v-dialog v-model="opened" max-width="450px">
    <v-card class="shepherd-net-start">
      <v-card-title class="title flex-center">Start a Net</v-card-title>
      <v-card-text>
        <p class="body-1">
          To start a net, select the type of net and the start time.
        </p>
        <v-form @submit.prevent="create">
          <v-select
            label="Net Type"
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
          <v-layout justify-space-between>
            <v-btn flat left @click="close">close</v-btn>
            <v-btn type="submit" class="capitalize" color="primary">
              <v-icon left>mdi-play</v-icon>
              <span>Start the Net</span>
            </v-btn>
          </v-layout>
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
        netTypes: [],
        net: {}
      }
    },
    created () {
      this.netEmpty = JSON.stringify(this.net)
    },
    methods: {
      afterOpen () {
        this.clear()
        this.list()
        // this.$nextTick(this.$refs.netSelect.focus)
      },
      clear () {
        this.net = JSON.parse(this.netEmpty)
      },
      create () {
        this.$root.req('Nets:create', this.net).then(response => {
          if (response) {
            this.$store.dispatch('snackbar', {text: 'The net has been started.'})
            this.close()
            this.$router.push(`/nets/${response}`)
          } else {
            this.$store.dispatch('snackbar', {text: 'Could not start the net.'})
          }
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
