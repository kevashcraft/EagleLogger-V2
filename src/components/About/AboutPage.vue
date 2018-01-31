<template>
  <v-container fluid style="height: 100%; padding: 0; overflow-y: scroll">
    <v-layout row justify-space-around style="padding: 20px 0; height: 100px">
      <v-flex xs11 md8 lg6>
        <v-card flat color="blue darken-3" class="v-card-parent">
          <v-card-text>
            <v-card class="v-card-child">
              <v-card-title><h3>About EagleLogger</h3></v-card-title>
              <v-card-text>
                <p>
                  EagleLogger is an amateur radio net logging application used to keep track of checkins and provide a live chat for hams. It contains an updated copy of the FCC's license database to aide in lookups.
                </p>
                <p>
                  <strong>Software stack:</strong>
                  <ul style="margin-left: 25px">
                    <li>
                      <a href="https://www.docker.com/" target="_blank" rel="noreferrer noopener">Docker</a>
                    </li>
                    <li>
                      <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer noopener">PostgreSQL</a>
                    </li>
                    <li>
                      <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer noopener">NodeJS</a>
                    </li>
                    <li>
                      <a href="https://socket.io/" target="_blank" rel="noreferrer noopener">SocketIO</a>
                    </li>
                    <li>
                      <a href="https://vuejs.org/" target="_blank" rel="noreferrer noopener">VueJS</a>
                    </li>
                    <li>
                      <a href="https://vuetifyjs.com/" target="_blank" rel="noreferrer noopener">Vuetify</a>
                    </li>
                    <li>
                      <a href="https://cordova.apache.org/" target="_blank" rel="noreferrer noopener">Apache Cordova</a>
                    </li>
                  </ul>
                </p>
                <p>
                  It's running on a <a href="https://coreos.com/" target="_blank" rel="noreferrer noopener">CoreOS</a> server hosted by <a href="https://www.digitalocean.com/" target="_blank" rel="noreferrer noopener">DigitalOcean</a>.
                </p>
                <p>EagleLogger is an open source application and your <strong>contributions are welcome</strong>!</p>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
        <v-card flat color="blue darken-3" class="v-card-parent" style="margin-top: 50px; margin-bottom: 50px">
          <v-card-text>
            <v-card class="v-card-child">
              <v-card-title><h3>Quick Stats</h3></v-card-title>
              <v-card-text>
                <ul style="padding: 0 15px 15px">
                  <li>Version: {{ appVersion }}</li>
                  <li>Repo: <a href="https://github.com/kevashcraft/eaglelogger" target="_blank" rel="noreferrer noopener">https://github.com/kevashcraft/eaglelogger</a></li>
                  <li>Planning: <a href="https://trello.com/b/ex29W90o/eaglelogger" target="_blank" rel="noreferrer noopener">Trello Board</a></li>
                </ul>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
        <v-card flat color="blue darken-3" class="v-card-parent" style="margin-top: 50px; margin-bottom: 50px">
          <v-card-text>
            <v-card class="v-card-child">
              <v-card-title><h3>Road Map</h3></v-card-title>
              <v-card-text>
                <ol style="padding: 0 15px 15px">
                  <li>Find and Fix initial bugs</li>
                  <li>Add Announcement Dialog</li>
                  <li>Add Traffic Counts</li>
                  <li>Add Traffic Tracking</li>
                  <li>Add User Avatars</li>
                  <li>Write Unit Tests</li>
                  <li>Implement End-to-end Testing</li>
                  <li>Add LetsEncrypt Certs</li>
                  <li>Release iOS App</li>
                </ol>
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

  export default {
    mixins: [Page],
    data () {
      return {
        appVersion: APP_VERSION
      }
    }
  }
</script>

