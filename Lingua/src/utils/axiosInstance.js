import { baseURL } from "@constants/api"
import axios from "axios"
import { refreshTokens } from "@services/directus"
export default axiosInstance = axios.create({
  baseURL: baseURL.directus,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response)
    return response
  },
  async (error) => {
    console.err(error)
    console.log(error.config)
    if (error.response.status === 401) {
      const newAccessToken = await refreshTokens()

      if (newAccessToken) {
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`
        return axiosInstance(error.config)
      }
    }
    return Promise.reject(error)
  }
)

export const setAuthToken = (token) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`
}

export const deleteAuthToken = () => {
  delete axiosInstance.defaults.headers["Authorization"]
}
