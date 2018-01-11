import Axios from 'axios'

export default {
  async get (url) {
    let response = await Axios.get(url)
    return response.data
  }
}
