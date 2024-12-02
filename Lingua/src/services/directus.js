import axiosInstance, { setAuthToken } from "@utils/axiosInstance"
import { saveTokens } from "@utils/saveTokens"
import { getItemAsync } from "expo-secure-store"

export async function signIn(email, password) {
  try {
    const res = await axiosInstance.post("/auth/login", {
      email,
      password,
    })

    const { access_token, refresh_token } = res.data.data
    saveTokens(access_token, refresh_token)
    setAuthToken(access_token)

    return true
  } catch (error) {
    console.error(error)
    return {
      isError: true,
      message: error.response?.data?.errors?.[0]?.message || "Error occurred",
    }
  }
}

export async function signUp(email, password, first_name, last_name) {
  try {
    const res = await axiosInstance.post("/users/register", {
      email,
      password,
      first_name,
      last_name,
    })
    return {
      isError: false,
      message: "User created successfully!",
      user: res.data,
    }
  } catch (error) {
    console.error("Error during sign up:", error)
    return {
      isError: true,
      message: error.response?.data?.errors?.[0]?.message || "Error occurred",
    }
  }
}

export async function refreshTokens() {
  try {
    const refreshToken = await getItemAsync("refesh_token")
    const res = await axiosInstance.post("/auth/refresh", {
      refresh_token: refreshToken,
    })

    console.log("Token Refreshed!")
    const { access_token, refresh_token } = res.data.data
    saveTokens(access_token, refresh_token)

    return res.data.data.access_token
  } catch (error) {
    console.error("Error refreshing token:", error)
    return null
  }
}

export async function getProfile() {
  console.log("getting")
  try {
    const res = await axiosInstance.get("/users/me")
    console.log("got")
    return res.data.data
  } catch (error) {
    console.error("Error fetching profile:", error)
    return error
  }
}
