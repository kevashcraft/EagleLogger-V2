<template>
  <v-container fluid style="height: 100%; padding: 0; overflow-y: scroll">
    <v-layout row justify-space-around style="padding: 20px 0; height: 100px">
      <v-flex xs11 md8>
        <v-card flat color="blue darken-3" class="v-card-parent" style="margin-top: 15px">
          <v-card-text>
            <v-card class="v-card-child">
              <v-card-title class="shepherd-welcome"><h3>Welcome to EagleLogger</h3></v-card-title>
              <v-card-text>
                <p>EagleLogger is an <strong>amateur radio net logging application</strong> built for the <a href="http://www.arrlwcf.org" target="_blank" rel="noreferrer noopener">WCF section</a> of the ARRL.</p>
                <p><strong>Quick Links</strong></p>
                <v-layout wrap row justify-space-around>
                  <v-flex xs12 md3 class="flex-center">
                    <a @click="$router.push('/nets')" >
                      <v-btn color="primary">
                        <v-icon left>mdi-format-list-bulleted-type</v-icon>
                        <span>Active Nets</span>
                      </v-btn>
                    </a>
                  </v-flex>
                  <v-flex xs12 md4 class="flex-center">
                    <v-btn color="orange" @click="$app.walkthrough()">
                      <v-icon left>mdi-walk</v-icon>
                      <span>Walkthrough</span>
                    </v-btn>
                  </v-flex>
                  <v-flex xs12 md4 class="flex-center" v-show="token.authed && user.ncs">
                    <v-btn color="orange white--text" @click="$app.walkthrough()">
                      <v-icon left>mdi-microphone</v-icon>
                      <span>NCS Walkthrough</span>
                    </v-btn>
                  </v-flex>
                  <v-flex xs12 md3 class="flex-center" v-show="!token.authed">
                    <v-btn color="primary" @click="$app.$refs.UserSignUpDialog.open()">
                      <v-icon left>mdi-account-plus</v-icon>
                      <span>Sign up!</span>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <p style="margin-top: 15px"><strong>Initial Release</strong></p>
                <p>This is the initial release of the program ({{appVersion}}), so if you find a bug or have a good idea to add, please <a @click="$app.$refs.FeedbackDialog.open()">send some feedback</a>.</p>
                <p>Thanks for visiting and <strong>enjoy the net</strong>!</p>
                <p v-show="!isCordova && isAndroid">
                  <a href='https://play.google.com/store/apps/details?id=com.eaglelogger.app&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img width="150px" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/></a>
                </p>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
        <v-card flat color="blue darken-3" class="v-card-parent" style="margin-top: 35px; margin-bottom: 35px" id="active-nets">
          <v-card-text>
            <v-card class="v-card-child">
              <v-card-title>
                <h3 class="red--text">Active Nets <small class="black--text" style="font-weight: normal">(click on a net to open it)</small></h3>
              </v-card-title>
              <v-card-text>
                <nets-list class="shepherd-active-nets"></nets-list>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Page from '@/components/Mixins/Page'
  import NetsList from '../Nets/NetsList.vue'

  import { mapState } from 'vuex'

  export default {
    mixins: [Page],
    data () {
      return {
        appVersion: APP_VERSION,
        isCordova: CORDOVA,
        isAndroid: /(android)/i.test(navigator.userAgent)
      }
    },
    computed: mapState(['token', 'user']),
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

