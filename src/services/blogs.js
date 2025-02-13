import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log(`new token set to ${token}`)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async updatedBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

const remove = async blogObject => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.delete(`${baseUrl}/${blogObject.id}`, config)
  return res.data
}

export default { getAll, createNew, setToken, update, remove }