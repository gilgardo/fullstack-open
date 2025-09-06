import axios from 'axios'
const getBaseUrl = (id) => `/api/blogs/${id}/comments`

const getAll = async (id) => {
  const request = axios.get(getBaseUrl(id))
  const response = await request
  return response.data
}

const create = async (id, newObject) => {
  const response = await axios.post(getBaseUrl(id), newObject)
  return response.data
}

export default { getAll, create }
