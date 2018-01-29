<template>
  <v-dialog v-model="opened">
    <v-card>
      <v-card-title center>{{ action }} Net Type</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Name"
            placeholder="Net name"
            v-model="netType.name"
          ></v-text-field>
          <v-text-field
            label="Frequency"
            placeholder="Net frequency"
            v-model="netType.frequency"
          ></v-text-field>
          <v-btn @click="post">Click</v-btn>
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
        netType: {
          name: null,
          frequency: null
        }
      }
    },
    created () {
      this.netTypeEmpty = JSON.stringify(this.netType)
    },
    methods: {
      afterOpen (action) {
        this.action = action
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
          this.close()
        })
      },
    }
  }
</script>
