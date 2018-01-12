<template>
  <v-container>
    <v-layout row justify-space-around>
      <v-flex xs12 md8 lg6>
        <v-card flat color="blue" class="v-card-parent">
          <v-card-text>
            <v-card class="v-card-child">
              <v-card-title>EagleLogger</v-card-title>
              <v-card-text><span>Hello this is an example of a v-card inside of a v-card</span></v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-around>
      <v-flex xs12 md8 lg6>
        <nets-list title="Active Nets"></nets-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import NetsList from '../Nets/NetsList.vue'

  export default {
    data () {
      return {
        where: 'home'
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

