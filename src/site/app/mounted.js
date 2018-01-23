export default function () {
  this.$store.dispatch('modalClear')
  this.socket.on('UpdateEvent', (data) => {
    this.$emit(data.controller + 'Updated', data.updateData)
  })
  if (this.$route.path === '/android_asset/www/index.html') {
    this.$router.push('/')
  }
}
