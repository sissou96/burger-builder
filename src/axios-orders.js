import axios from 'axios'

const instance = axios.create({
  // baseURL: 'https://burger-builder-88274.firebaseio.com/'
  baseURL: 'https://burger-builder-88274.firebaseio.com/'
})

export default instance