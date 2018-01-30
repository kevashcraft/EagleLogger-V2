<template>
  <v-dialog v-model="opened" max-width="450px">
    <v-card>
      <v-card-title class="title flex-center">Delete the Net</v-card-title>
      <v-card-text>
        <p class="body-1">
          Would you like to delete this net?
        </p>
        <v-form @submit.prevent="update">
          <v-layout justify-space-between>
            <v-btn flat left @click="close">close</v-btn>
            <v-btn type="submit" color="red">
              <v-icon left>mdi-delete</v-icon>
              <span>Delete the Net</span>
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
        net: {}
      }
    },
    methods: {
      afterOpen () {
        this.net = JSON.parse(JSON.stringify(this.$store.state.net))
      },
      update () {
        this.$root.req('Nets:delete', this.net).then(response => {
          this.$store.dispatch('snackbar', {text: 'The net has been deleted.'})
          this.$router.push('/nets')
          this.close()
        })
      }
    }
  }
</script>
