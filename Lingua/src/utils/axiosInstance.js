import { directus } from "@constants/api"
import axios from "axios"
import * as SecureStore from "expo-secure-store"
import * as TokenManager from "@utils/TokenManager"

export const axiosInstance = axios.create({
  baseURL: directus.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  async (request) => {
    const accessToken = await SecureStore.getItemAsync("accessToken")
    console.log("Interceptor Fetched Token")
    if (
      accessToken &&
      request.url !== "/auth/login" &&
      request.url !== "/auth/refresh"
    ) {
      request.headers["Authorization"] = `Bearer ${accessToken}`
    } else {
      delete request.headers["Authorization"]
    }
    return request
  },
  (error) => {
    console.error("Interceptor Error: " + error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Second Interceptor Successful: ")
    return response
  },
  async (error) => {
    console.error("Second Interceptor Error: " + error)

    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/login"
    ) {
      originalRequest._retry = true
      try {
        const { accessToken } = await TokenManager.refreshTokens()

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`

        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error("Interceptor Token refresh failed: ", refreshError)
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
