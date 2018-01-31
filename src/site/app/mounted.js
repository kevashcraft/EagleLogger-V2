export default function () {
  this.socket.on('UpdateEvent', (data) => {
    this.$emit(data.controller + 'Updated', data.updateData)
  })
  if (this.$route.path === '/android_asset/www/index.html') {
    this.$router.push('/')
  }
  if (this.$store.state.token.authed) {
    this.$root.req('Users:retrieve', {id: this.$store.state.token.userId}).then(response => {
      if (response) {
        this.$store.commit('userSet', response)
      } else {
        this.$store.dispatch('logout')
      }
    })
  }
}
