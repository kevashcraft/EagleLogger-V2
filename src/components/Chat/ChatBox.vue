<template>
  <v-card>
    <p class="display-1" style="position: absolute; top: 50%; left: 50%; width: 300px; margin-left: -150px; height: 50px; line-height: 50px; margin-top: -25px; text-align: center; opacity: 0.1">Chat</p>
    <v-list ref="list">
      <template v-for="c in chat">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title v-text="c.title"></v-list-tile-title>
            <v-list-tile-sub-title v-text="c.message" style="margin-left: 15px"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <v-text-field
      placeholder="Send a message"
      v-model="message"
      append-icon="mdi-send"
      :append-icon-cb="create"
      @keyup.native="keyup"
      style="flex: 0 75px; padding-left: 15px; padding-right: 35px;"
      v-show="token.authed"
    ></v-text-field>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        chat: [],
        message: null,
      }
    },
    computed: mapState(['token']),
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
          let list = this.$refs.list.$el
          window.scrollTop = window.scrollHeight
          let scroll = list.scrollTop === list.scrollHeight - list.offsetHeight
          this.chat = response
          this.$nextTick(() => {
            list.scrollTop = list.scrollHeight
          })
          if (scroll) {
          }
        })
      },
      keyup (event) {
        if (event.keyCode === 13) this.create()
      }
    }
  }
</script>
