import socket from './socket'

export default function () {
  return {
    socket: socket,
    isFullscreen: false,
    snackbar: false,
    snackbarText: ''
  }
}
