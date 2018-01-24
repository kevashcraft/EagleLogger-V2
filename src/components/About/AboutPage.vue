<template>
  <v-container fluid style="height: 100%; padding: 0; overflow-y: scroll">
    <v-layout row justify-space-around style="padding: 20px 0; height: 100px">
      <v-flex xs12 md8 lg6>
        <v-card flat color="blue" class="v-card-parent">
          <v-card-text>
            <v-card class="v-card-child">
              <v-card-title><h3>About EagleLogger</h3></v-card-title>
              <v-card-text>
                <p>EagleLogger is an amateur radio net logging application built for the <a href="http://www.arrlwcf.org" target="_blank" rel="noreferrer noopener">WCF section</a> of the ARRL.</p>
                <p>The application is built with <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer noopener">NodeJS</a>, <a href="https://socket.io/" target="_blank" rel="noreferrer noopener">SocketIO</a>, <a href="https://vuejs.org/" target="_blank" rel="noreferrer noopener">VueJS</a> and <a href="https://vuetifyjs.com/" target="_blank" rel="noreferrer noopener">Vuetify</a> with a <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer noopener">PostgreSQL</a> database. It's running on <a href="https://www.docker.com/" target="_blank" rel="noreferrer noopener">Docker</a> containers on a <a href="https://coreos.com/" target="_blank" rel="noreferrer noopener">CoreOS</a> server hosted by <a href="https://www.digitalocean.com/" target="_blank" rel="noreferrer noopener">DigitalOcean</a>.</p>
                <p>EagleLogger is an open source application and your <strong>contributions are welcome</strong>!</p>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
        <v-card flat color="blue" class="v-card-parent" style="margin-top: 50px; margin-bottom: 50px">
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
        <v-card flat color="blue" class="v-card-parent" style="margin-top: 50px; margin-bottom: 50px">
          <v-card-text>
            <v-card class="v-card-child">
              <v-card-title><h3>Road Map</h3></v-card-title>
              <v-card-text>
                <ol style="padding: 0 15px 15px">
                  <li>Find and Fix initial bugs</li>
                  <li>Release Android App</li>
                  <li>Automatically Retrieve Daily FCC Database Updates</li>
                  <li>Cleanup Net Controls</li>
                  <li>Cleanup Net Types Page</li>
                  <li>Add User Setting</li>
                  <li>Add Station Level Appointee Badges</li>
                  <li>Add SKYWARN Numbers</li>
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
  export default {
    data () {
      return {
        appVersion: APP_VERSION
      }
    }
  }
</script>

