import { Server } from 'http'
import IO from 'socket.io'

import router from './app/router'

let http = Server()
let io = IO(http)

io.on('connection', (socket) => {
  socket.on('request', async (request, callback) => {
    let route = request.route.split(':')
    let controller = route[0]
    let method = route[1]

    let data = request.data

    let response = await router[controller][method](data)

    callback(response)
  })
})

http.listen('3001', () => {
  console.log('listening on 3001')
})
