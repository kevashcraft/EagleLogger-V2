<template>
  <v-dialog v-model="opened" max-width="450px">
    <v-card>
      <v-card-title class="title flex-center">Close the Net</v-card-title>
      <v-card-text>
        <p class="body-1">
          Confirm the start and end times of the net.
        </p>
        <v-form @submit.prevent="update">
          <v-text-field
            label="Start time"
            placeholder="Net start time"
            type="time"
            v-model="net.startTime"
          ></v-text-field>
          <v-text-field
            label="End time"
            placeholder="Net end time"
            type="time"
            v-model="net.stopTime"
          ></v-text-field>
          <v-layout justify-space-between>
            <v-btn flat left @click="close">close</v-btn>
            <v-btn type="submit" color="primary">
              <v-icon left>mdi-door-closed</v-icon>
              <span>Close the Net</span>
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
        net: {id: null, startTime: null, stopTime: null}
      }
    },
    methods: {
      afterOpen () {
        this.net = JSON.parse(JSON.stringify(this.$store.state.net))
        this.net.stopTime = moment().format('HH:mm')
      },
      update () {
        this.$root.req('Nets:stop', this.net).then(response => {
          this.$store.dispatch('snackbar', {text: 'The net has been stopped.'})
          this.close()
        })
      }
    }
  }
</script>
