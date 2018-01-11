export default {
  req (route, data) {
    return new Promise((resolve, reject) => {
      this.socket.emit('request', {route, data}, (response) => {
        resolve(response)
      })
    })
  }
}
