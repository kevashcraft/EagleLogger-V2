export default {
  req (route, data = {}) {
    data.token = this.$store.state.token
    console.log('requesting', route, data)
    return new Promise((resolve, reject) => {
      this.socket.emit('request', {route, data}, (response) => {
        console.log('received', response)
        resolve(response)
      })
    })
  }
}
