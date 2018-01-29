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
          <v-text-field
            label="Spotter ID"
            placeholder="SKYWARN Spotter ID"
            mask="AAA-###nn"
            v-model="callsign.spotterId"
          ></v-text-field>
          <v-select
            label="Official Positions"
            chips
            multiple
            :items="titles"
            item-text="title"
            item-value="id"
            hint="Select official positions"
            v-model="callsign.titleIds"
          ></v-select>
          <v-layout justify-center v-show="!callsign.ncs">
            <v-btn class="blue--text" flat v-show="!callsign.ncs" @click="$root.page.$refs.CallsignNcsDialog.open(callsign)"><v-icon left>mdi-key-plus</v-icon> Make NCS</v-btn>
          </v-layout>
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
  import Dialog from '@/components/Mixins/Dialog'

  export default {
    mixins: [Dialog],
    data () {
      return {
        callsign: {
          titleIds: [],
          ncs: true
        },
        titles: []
      }
    },
    created () {
      this.callsignEmpty = JSON.stringify(this.callsign)
      this.listTitles()
    },
    methods: {
      afterOpen (callsignId) {
        this.clear()
        this.retrieve(callsignId)
        this.$nextTick(this.$refs.autofocus.focus)
      },
      clear () {
        this.callsign = JSON.parse(this.callsignEmpty)
      },
      listTitles () {
        this.$root.req('Titles:list', {}).then(response => {
          this.titles = response
        })
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
