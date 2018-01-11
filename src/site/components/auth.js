export default {
  login (token) {
    localStorage.setItem('token', token)
  },

  logout () {
    localStorage.token = false
  },

  authenticated () {
    console.log("localStorage.token",localStorage.getItem('token'));
  }
}
