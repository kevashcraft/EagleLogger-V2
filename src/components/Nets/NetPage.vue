<template>
  <v-container>
    <div>net: {{ net.name }} ({{ $route.params.id }})</div>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        net: {}
      }
    },

    mounted () {
      this.getNet()
    },

    methods: {
      async getNet() {
        this.net = await ajax.get('/net.json')
      }
    }
  }
</script>
