<template>
  <v-dialog v-model="opened">
    <v-card>
      <v-card-title center>Login</v-card-title>
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
          <v-btn @click="create">Login</v-btn>
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
  border: 1px solid green;
  -webkit-text-fill-color: green;
  -webkit-box-shadow: 0 0 0px 1000px #000 inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>

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
        this.$root.req('Auth:create', this.user).then(response => {
        })
      }
    }
  }
</script>
