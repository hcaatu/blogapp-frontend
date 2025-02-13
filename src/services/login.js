import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

const logout = async () => {
  const res = await axios.delete(baseUrl)
  console.log(`retuned data ${res.data}`)
  return res.data
}

export default { login, logout }
