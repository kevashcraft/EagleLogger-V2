export default function () {
  this.$store.dispatch('modalClear')
  this.socket.on('UpdateEvent', (data) => {
    this.$emit(data.controller + 'Updated', data.updateData)
  })
}
