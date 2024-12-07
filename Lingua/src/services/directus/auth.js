import { axiosInstance } from "@utils/axiosInstance"
import { logError } from "@utils/errorLogger"
import { saveTokens } from "@utils/TokenManager"

export async function signIn(email, password) {
  console.log(email, password)
  try {
    const res = await axiosInstance.post("/auth/login", { email, password })
    const { access_token, refresh_token } = res.data.data
    await saveTokens(access_token, refresh_token)
  } catch (error) {
    console.error("Sign In failed")
    throw new Error(logError("signIn", error))
  }
}

export async function signUp(email, password, first_name, last_name) {
  console.log("Registering user...")
  try {
    const res = await axiosInstance.post("/users/register", {
      email,
      password,
      first_name,
      last_name,
    })
    console.log(res.data.data)
    console.log("User registered successfully!")
    await signIn(email, password)
  } catch (error) {
    console.error("Sign Up failed")
    console.error(error.message[0])
    throw new Error(logError("signUp", error))
  }
}
