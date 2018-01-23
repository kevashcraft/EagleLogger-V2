/* global API_SERVER */

import IO from 'socket.io-client'

let socket = IO(API_SERVER)

export default socket
