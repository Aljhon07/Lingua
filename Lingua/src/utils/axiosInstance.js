import { directus } from "@constants/api"
import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: directus.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000
})
