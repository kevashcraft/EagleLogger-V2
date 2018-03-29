import { Server } from 'http'
import IO from 'socket.io'
import redisAdapter from 'socket.io-redis'

import router from './router'
import broadcastables from './broadcastables'

import dns from 'dns'

let http = Server()
let io = IO(http)

io.adapter(redisAdapter({host: 'eaglelogger-redis.default.svc.cluster.local', port: 6379}))

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

http.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`)
})
