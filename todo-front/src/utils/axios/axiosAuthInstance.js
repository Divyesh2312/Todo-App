import axios from 'axios'
import { getToken } from '../cookies/cookies'
import toast from 'react-hot-toast'

const baseURL = "http://localhost:5000/api/";


const axiosInstance = axios.create({
  baseURL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`

    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

const axiosAuthInstance = {
  get: async (url, params = {}) => {
    try {
      const response = await axiosInstance.get(url, { params })
      return response
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.')
    }
  },
  post: async (url, data) => {
    try {
      const response = await axiosInstance.post(url, data, {
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      })
      toast.success(response?.data?.message)
      return response
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.')
    }
  },
  put: async (url, data) => {
    try {
      const response = await axiosInstance.put(url, data)
      if (response?.data?.message) {
        toast.success(response.data.message)
      }
      return response
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.')
    }
  },
  delete: async (url, data) => {
    try {
      const response = await axiosInstance.delete(url, data)
      toast.success(response?.data?.message)
      return response
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.')
    }
  },
}

export default axiosAuthInstance
