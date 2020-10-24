import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-udemy-course-9c662.firebaseio.com'
})

export default instance