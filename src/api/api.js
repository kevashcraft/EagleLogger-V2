import { Server } from 'http'
import IO from 'socket.io'

import router from './app/router'
import broadcastables from './app/broadcastables'

let http = Server()
let io = IO(http)

io.on('connection', (socket) => {
  socket.on('request', async (request, callback) => {
    let route = request.route.split(':')
    let controller = route[0]
    let method = route[1]

    let data = request.data

    let response = await router[controller][method](data)

    if (broadcastables[controller] && broadcastables[controller][method]) {
      let update = broadcastables[controller][method]
      let updateData = update.data ? data[update.data] : false
      io.emit('UpdateEvent', {controller, updateData})
    }

    callback(response)
  })
})

http.listen('3001', () => {
  console.log('listening on 3001')
})
