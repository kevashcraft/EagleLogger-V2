<template>
  <v-card style="position: relative">
    <v-list style="max-height: 250px; overflow-y: auto; margin-bottom: 50px;" ref="list">
      <template v-for="c in chat">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title v-text="c.user"></v-list-tile-title>
            <v-list-tile-sub-title v-text="c.message"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <v-text-field
      placeholder="Message"
      v-model="message"
      append-icon="mdi-send"
      :append-icon-cb="create"
      @keyup.native="keyup"
      style="position: absolute; bottom: -15px; padding-left: 15px; padding-right: 35px;"
    ></v-text-field>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        chat: [],
        message: null,
      }
    },
    props: ['netId'],
    created () {
      this.$root.$on('ChatUpdated', (data) => {
        if (data === this.netId) {
          this.retrieve()
        }
      })
    },
    watch: {
      netId (netId) {
        if (netId) this.retrieve()
      }
    },
    mounted () {
      let list = this.$refs.list
      if (this.netId) this.retrieve()
    },
    methods: {
      create () {
        let data = {
          message: this.message,
          userId: this.$store.state.token.userId,
          netId: this.netId
        }
        this.message = null
        this.$root.req('Chat:create', data)
      },
      retrieve () {
        this.$root.req('Chat:retrieve', {netId: this.netId}).then(response => {
          let list = this.$refs.list
          let scroll = list.$el.scrollTop === list.$el.scrollHeight - list.$el.offsetHeight
          this.chat = response
          if (scroll) {
            this.$nextTick(() => {
              list.$el.scrollTop = list.$el.scrollHeight
            })
          }
        })
      },
      keyup (event) {
        // console.log('event', event)
        if (event.keyCode === 13) this.create()
      }
    }
  }
</script>
