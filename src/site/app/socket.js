import IO from 'socket.io-client'

let domain = window.location.hostname
let socket = IO(`http://${domain}:3001`)

export default socket
