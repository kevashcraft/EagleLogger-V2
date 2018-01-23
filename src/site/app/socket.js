import IO from 'socket.io-client'

let domain = window.location.hostname
if (domain) {
  if (window.location.protocol !== 'https:') {
    domain = 'http://' + domain
  } else {
    domain = 'https://' + domain
  }
} else {
  domain = API_URL
}

let socket = IO(`${domain}:3001`)

export default socket
