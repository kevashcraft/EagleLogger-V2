<template>
  <v-card color="blue" style="margin-top: 48px">
    <v-card-text>
      <v-card>
        <v-card-title>Recent Nets</v-card-title>
        <v-card-text>
          <v-list style="max-height: 250px; overflow-y: auto">
            <template v-for="net in nets">
              <v-subheader v-if="net.header" v-text="net.header"></v-subheader>
              <v-divider v-else-if="net.divider" :inset="net.inset"></v-divider>
              <v-list-tile v-else avatar :key="net.id" @click="">
                <v-list-tile-avatar>
                  <img :src="net.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-text="net.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-text="net.description"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
  import ajax from './ajax'

  export default {
    data () {
      return {
        nets: [],
      }
    },
    async created () {
      this.nets = await ajax.get('/nets.json')
    }
  }
</script>
