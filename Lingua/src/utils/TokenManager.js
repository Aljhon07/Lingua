import { directus } from "@constants/api"
import axios from "axios"
import * as SecureStore from "expo-secure-store"
import { logError } from "./errorLogger"

export async function refreshTokens() {
  try {
    const refreshToken = await SecureStore.getItemAsync("refreshToken")

    const response = await axios.post(`${directus.baseURL}/auth/refresh`, {
      refresh_token: refreshToken,
    })
    const { access_token: accessToken, refresh_token: newRefreshToken } =
      response.data.data
    console.log(accessToken, newRefreshToken)
    saveTokens(accessToken, newRefreshToken)
    return { accessToken, newRefreshToken }
  } catch (error) {
    SecureStore.deleteItemAsync("accessToken")
    SecureStore.deleteItemAsync("refreshToken")
    logError("Refresh Token", error)
  }
}

export async function saveTokens(accessToken, refreshToken) {
  try {
    await SecureStore.setItemAsync("accessToken", accessToken)
    await SecureStore.setItemAsync("refreshToken", refreshToken)
  } catch (error) {
    console.error("Error saving tokens:", error)
  }
}

export async function removeTokens() {
  try {
    await SecureStore.deleteItemAsync("accessToken")
    await SecureStore.deleteItemAsync("refreshToken")
  } catch (error) {
    console.error("Error deleting tokens:", error)
  }
}
