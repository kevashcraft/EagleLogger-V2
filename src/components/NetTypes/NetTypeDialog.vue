<template>
  <v-dialog v-model="opened" max-width="450px">
    <v-card>
      <v-card-title class="title flex-center capitalize">{{ action }} Net Type</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="post">
          <v-text-field
            label="Name"
            placeholder="Net name"
            ref="autofocus"
            v-model="netType.name"
          ></v-text-field>
          <v-text-field
            label="Start time"
            placeholder="Net start time"
            type="time"
            v-model="netType.startTime"
          ></v-text-field>
          <v-text-field
            label="Frequency"
            placeholder="Net frequency"
            type="number"
            v-model="netType.frequency"
          ></v-text-field>
          <v-layout v-show="!deleteConfirm">
            <v-btn flat @click="deleteConfirm = true">
              <v-icon left>mdi-delete</v-icon>
              <span>Delete Net Type</span>
            </v-btn>
          </v-layout>
          <v-layout justify-space-around v-show="deleteConfirm">
            <v-btn @click="deleteConfirm = false" v-show="deleteConfirm" color="green">
              <v-icon left>mdi-cancel</v-icon>
              <span>Cancel</span>
            </v-btn>
            <v-btn @click="updateDelete" v-show="deleteConfirm" color="red">
              <v-icon left>mdi-delete</v-icon>
              <span>Delete</span>
            </v-btn>
          </v-layout>
          <v-layout justify-space-between>
            <v-btn flat left @click="close">close</v-btn>
            <v-btn type="submit" class="capitalize" color="primary">
              <v-icon left>mdi-content-save-outline</v-icon>
              <span>{{ action }}</span>
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
        action: 'Create',
        deleteConfirm: false,
        netType: {
          name: null,
          startTime: null,
          frequency: null
        }
      }
    },
    created () {
      this.netTypeEmpty = JSON.stringify(this.netType)
    },
    methods: {
      afterOpen ({action, netTypeId}) {
        this.deleteConfirm = false
        this.action = action
        if (action === 'update') {
          this.retrieve(netTypeId)
        }
        this.$nextTick(this.$refs.autofocus.focus)
        this.clear()
      },
      clear () {
        this.netType = JSON.parse(this.netTypeEmpty)
      },
      post () {
        this[this.action.toLowerCase()]()
      },
      create () {
        this.$root.req('NetTypes:create', this.netType).then(response => {
          this.$store.dispatch('snackbar', {text: `${this.netType.name} has been created.`})
          this.close()
        })
      },
      retrieve (id) {
        this.$root.req('NetTypes:retrieve', {id}).then(response => {
          this.netType = response
        })
      },
      update () {
        this.$root.req('NetTypes:update', this.netType).then(response => {
          this.$store.dispatch('snackbar', {text: `${this.netType.name} has been updated.`})
          this.close()
        })
      },
      updateDelete () {
        this.$root.req('NetTypes:delete', this.netType).then(response => {
          this.$store.dispatch('snackbar', {text: `${this.netType.name} has been deleted.`})
          this.close()
        })
      }
    }
  }
</script>
