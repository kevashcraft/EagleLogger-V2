<template>
  <v-container fluid style="height: 100%; padding: 0; overflow-y: scroll">
    <v-layout row justify-space-around style="padding: 20px 0; height: 100px">
      <v-flex xs12 md8>
        <v-card flat color="blue" class="v-card-parent">
          <v-card-text>
            <v-card class="v-card-child">
              <v-card-title><h3>EagleLogger Testing</h3></v-card-title>
              <v-card-text>
                <p>Welcome to EagleLgoger and thanks for testing out the program!</p>
                <p>You can <a href="/nets/1" style="text-decoration: none"><v-btn color="orange white--text"><v-icon>mdi-email</v-icon>Join the EagleNet</v-btn></a> here or sign up for a temporary account.</p>
                <p>Please <a href="mailto:app@eaglelogger.com" style="text-decoration: none"><v-btn color="primary"><v-icon>mdi-email</v-icon>Email Me</v-btn></a> if you have any issues or good ideas.</p>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
        <v-card flat color="blue" class="v-card-parent">
          <v-card-text>
            <v-card class="v-card-child">
              <v-card-title><h3>Welcome to EagleLogger</h3></v-card-title>
              <v-card-text>
                <p>EagleLogger is an amateur radio net logging application built for the <a href="http://www.arrlwcf.org" target="_blank" rel="noreferrer noopener">WCF section</a> of the ARRL.</p>
                <p>This is the beta version of the program ({{appVersion}}) and there are still a few bugs to be worked out. If you find a bug or have a good idea for a new feature, please email it to <a href="mailto:app@eaglelogger.com">app@eaglelogger.com</a>.</p>
                <p>Thanks for visiting and enjoy the net!</p>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
        <nets-list title="Active Nets" style="margin-bottom: 50px"></nets-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import NetsList from '../Nets/NetsList.vue'

  export default {
    data () {
      return {
        appVersion: APP_VERSION
      }
    },
    components: {
      NetsList
    }
  }
</script>

<style lang="scss">
  .v-card-parent {
    margin-top: 24px;
  }
  .v-card-child {
    margin-top: -24px;
    top: 24px;
  }
</style>

