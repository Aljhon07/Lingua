import { axiosInstance } from "@utils/axiosInstance"
import { logError } from "@utils/errorLogger"
import { randomUUID } from "expo-crypto"
import * as SecureStorage from "expo-secure-store"

export async function signIn(email, password) {
  SecureStorage.deleteItemAsync("accessToken")
  delete axiosInstance.defaults.headers.common["Authorization"]
  console.log("Signing in...")
  try {
    const res = await axiosInstance.post("/auth/login", {
      email,
      password,
    })

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.data.access_token}`

    const staticToken = randomUUID()
    const token = await axiosInstance.patch("/users/me", {
      token: staticToken,
      static_token: staticToken,
    })

    await SecureStorage.setItemAsync(
      "accessToken",
      token.data.data.static_token
    )
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token.data.data.static_token}`
  } catch (error) {
    err = logError("signIn", error)

    console.error("Sign In failed", typeof err)
    err = {
      error: true,
      message: err.responseData?.[0]?.message || err.message,
      status: err.status,
    }
    return err
  }
}

export async function signUp(email, password, first_name, last_name) {
  SecureStorage.deleteItemAsync("accessToken")
  delete axiosInstance.defaults.headers.common["Authorization"]
  console.log("Registering user: ", first_name, last_name)
  try {
    const res = await axiosInstance.post("/users/register", {
      email,
      password,
      first_name,
      last_name,
    })
    console.log("User registered successfully!")
  } catch (error) {
    console.error("Sign Up failed")
    console.error(error.message[0])
    throw new Error(logError("signUp", error))
  }
}
