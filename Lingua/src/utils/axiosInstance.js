import { directus } from "@constants/api"
import axios from "axios"
import * as SecureStore from "expo-secure-store"
import * as TokenManager from "@utils/TokenManager"
import { randomUUID } from "expo-crypto"

export const axiosInstance = axios.create({
  baseURL: directus.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})
