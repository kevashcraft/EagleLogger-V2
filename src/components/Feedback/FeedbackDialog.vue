<template>
  <v-dialog v-model="opened" max-width="400px">
    <v-card>
      <v-card-title class="title flex-center">Feedback / Support</v-card-title>
      <v-card-text>
        <p class="body-1">Experienced an issue or have a good idea? Send a message!</p>
        <v-form @submit.prevent="create">
          <v-text-field
            label="Message"
            placeholder="What could make EagleLogger better?"
            multi-line
            ref="autofocus"
            v-model="feedback.message"
          ></v-text-field>
          <v-layout justify-space-between>
            <v-btn flat left @click="close">close</v-btn>
            <v-btn color="primary" type="submit">
              <v-icon left>mdi-send</v-icon>
              <span>Send Feedback</span>
            </v-btn>
          </v-layout>
          <div class="text-xs-right">
          </div>
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
    border: 1px solid #fff;
    -webkit-text-fill-color: #000;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }
</style>

<script>
  import Dialog from '@/components/Mixins/Dialog'

  export default {
    mixins: [Dialog],
    data () {
      return {
        feedback: {
          message: null
        }
      }
    },
    created () {
      this.feedbackEmpty = JSON.stringify(this.feedback)
    },
    methods: {
      afterOpen () {
        this.$nextTick(this.$refs.autofocus.focus)
      },
      clear () {
        this.feedback = JSON.parse(this.feedbackEmpty)
      },
      create () {
        this.feedback.page = this.$route.path
        this.$root.req('Feedback:create', this.feedback).then(response => {
          this.clear()
          this.$store.dispatch('snackbar', {text: "Thanks! We'll be in touch."})
          this.close()
        })
      }
    }
  }
</script>
