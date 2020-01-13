import axios from "axios"

export default axios.create({
  // Development URL
  baseURL: 'http://localhost:3030/',
  timeout: 10000,
  withCredentials: true
})
