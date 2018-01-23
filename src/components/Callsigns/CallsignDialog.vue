<template>
  <v-dialog v-model="opened" max-width="400px">
    <v-card>
      <v-card-title class="title flex-center">Edit Callsign</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="update">
          <v-text-field
            label="Name"
            placeholder="Preferred Name"
            ref="autofocus"
            v-model="callsign.name"
          ></v-text-field>
          <v-layout justify-space-between>
            <v-btn flat left @click="close">close</v-btn>
            <v-btn color="primary" type="submit">
              <v-icon left>mdi-content-save</v-icon>
              <span>Save</span>
            </v-btn>
          </v-layout>
          <div class="text-xs-right">
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style>
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: 1px solid #fff;
    -webkit-text-fill-color: #000;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }
</style>

<script>
  export default {
    data () {
      return {
        opened: false,
        callsign: {}
      }
    },
    created () {
      this.callsignEmpty = JSON.stringify(this.callsign)
    },
    methods: {
      open (callsignId) {
        this.clear()
        this.retrieve(callsignId)
        this.opened = true
        this.$nextTick(this.$refs.autofocus.focus)
      },
      clear () {
        this.callsign = JSON.parse(this.callsignEmpty)
      },
      close () {
        this.opened = false
      },
      retrieve (callsignId) {
        this.$root.req('Callsigns:retrieve', {callsignId}).then(response => {
          this.callsign = response
        })
      },
      update () {
        this.$root.req('Callsigns:update', this.callsign).then(response => {
          this.close()
        })
      }
    }
  }
</script>
