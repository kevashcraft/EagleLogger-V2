import IO from 'socket.io-client'

let socket = IO('http://127.0.0.1:3001')

export default socket
