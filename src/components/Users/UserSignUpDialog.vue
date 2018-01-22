<template>
  <v-dialog v-model="opened">
    <v-card>
      <v-card-title center>Sign Up</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Callsign"
            placeholder="Your callsign"
            v-model="user.callsign"
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="user.password"
            placeholder="Your new password"
          ></v-text-field>
          <v-text-field
            label="ARRL Email Address"
            v-model="arrlEmailAddress"
            disabled
            placeholder="Your ARRL email address"
          ></v-text-field>
          <v-btn @click="create">Get User Name <v-icon dark right>mdi-plus</v-icon></v-btn>
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
        user: {
          callsign: null,
          password: null
        }
      }
    },
    computed: {
      arrlEmailAddress () {
        if (!this.user || !this.user.callsign) return null
        return this.user.callsign.toUpperCase() + '@arrl.net'
      }
    },
    watch: {
      'user.callsign' (callsign) {
        if (callsign !== callsign.toUpperCase()) {
          this.user.callsign = callsign.toUpperCase()
        }
      }
    },
    methods: {
      open () {
        this.opened = true
      },
      create () {
        this.$root.req('Users:create', this.user).then(response => {
        })
      }
    }
  }
</script>
