<template>
  <v-dialog v-model="opened" max-width="450px">
    <v-card>
      <v-card-title class="title flex-center">My Settings</v-card-title>
      <v-card-text>
        <p class="body-1">
          You can update your settings to change your name, email address, or password.
        </p>
        <v-form @submit.prevent="update">
          <v-text-field
            label="Name"
            placeholder="Your name"
            ref="autofocus"
            v-model="user.name"
          ></v-text-field>
          <v-text-field
            label="Email"
            placeholder="Your email address"
            v-model="user.email"
          ></v-text-field>
          <v-text-field
            label="Spotter ID"
            placeholder="Your SKYWARN spotter ID"
            mask="AAA-###nn"
            v-model="user.spotterId"
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="user.newPassword"
            placeholder="Your new password"
          ></v-text-field>
          <v-layout justify-space-between>
            <v-btn flat left @click="close">close</v-btn>
            <v-btn type="submit" color="primary">
              <v-icon left>mdi-content-save-outline</v-icon>
              <span>Save Settings</span>
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
        user: {
          name: null,
          newPassword: null,
          email: null
        }
      }
    },
    created () {
      this.userEmpty = JSON.stringify(this.user)
    },
    methods: {
      afterOpen () {
        this.user = JSON.parse(this.userEmpty)
        this.user = this.$store.state.user
        this.$nextTick(this.$refs.autofocus.focus)
      },
      update () {
        this.$root.req('Users:update', this.user).then(response => {
          this.close()
          this.$store.dispatch('snackbar', {text: 'Your settings have been updated'})
          this.$store.commit('userSet', response)
        })
      }
    }
  }
</script>
