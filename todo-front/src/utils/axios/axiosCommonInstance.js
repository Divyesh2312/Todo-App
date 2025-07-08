import axios from 'axios'
import toast from 'react-hot-toast'

const baseURL = "http://localhost:5000/api/";



const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const axiosCommonInstance = {
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
      const response = await axiosInstance.post(url, data)
      return response
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.')
    }
  },
  put: async (url, data) => {
    try {
      const response = await axiosInstance.put(url, data)
      return response
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.')
    }
  },
  delete: async (url, data) => {
    try {
      const response = await axiosInstance.delete(url, data)
      return response
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.')
    }
  },
}

export default axiosCommonInstance
