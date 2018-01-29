export default {
  data () {
    return {
      opened: false
    }
  },
  methods: {
    open (data = null) {
      if (this.$root.openedDialog) this.$root.openedDialog.close()
      this.$root.openedDialog = this
      this.opened = true
      if (this.afterOpen) this.afterOpen(data)
    },
    close () {
      this.opened = false
    }
  }
}
