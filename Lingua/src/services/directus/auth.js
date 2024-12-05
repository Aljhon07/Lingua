import { axiosInstance } from "@utils/axiosInstance"
import { logError } from "@utils/errorLogger"
import { saveTokens } from "@utils/TokenManager"

export async function signIn(email, password) {
  try {
    const res = await axiosInstance.post("/auth/login", { email, password })
    const { access_token, refresh_token } = res.data.data
    await saveTokens(access_token, refresh_token)
  } catch (error) {
    const errorDetails = logError("signIn", error)
    throw new Error(errorDetails.message || "Sign In failed")
  }
}

export async function signUp(email, password, first_name, last_name) {
  axiosInstance({})
  try {
    const res = await axiosInstance.post("/users/register", {
      email,
      password,
      first_name,
      last_name,
    })
  } catch (error) {}
}
