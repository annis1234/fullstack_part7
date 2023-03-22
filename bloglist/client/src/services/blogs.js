import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken= newToken => {
  token = `bearer ${newToken}`
}

export default { setToken }

export const getBlogs = () =>
  axios.get(baseUrl).then(res => res.data)

export const update = updatedBlog =>
  axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog).then(res => res.data)

export const remove = async removedBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${removedBlog.id}`, config)
  return response.data
}

export const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data

}