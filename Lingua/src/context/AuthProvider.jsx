import { createContext, useState, useContext, useEffect } from "react"
import { signIn, signUp } from "@services/directus/auth"
import * as SecureStorage from "expo-secure-store"
import { axiosInstance } from "@utils/axiosInstance"
import { useProfileContext } from "./ProfileProvider"

export const AuthContext = createContext()
export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const { getProfile } = useProfileContext()

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await SecureStorage.getItemAsync("accessToken")
        if (token) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`
          const profile = await getProfile()
          if (profile) setIsAuthenticated(true)
        } else {
          console.log("Auth: Token deleted")
          delete axiosInstance.defaults.headers.common["Authorization"]
        }
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }
    checkAuthStatus()
  }, [])

  const contextSignIn = async ({ email, password }) => {
    setLoading(true)
    try {
      const res = await signIn(email, password)
      console.log("Auth Res: ", res)
      if (res?.error) {
        console.error("Conditional", res.error)
        return res.message
      }
      await getProfile()
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Auth Error", error)
    } finally {
      console.log("Loading finished")
      setLoading(false)
    }
  }

  const contextSignUp = async ({ email, password, firstName, lastName }) => {
    setLoading(true)
    try {
      const res = await signUp(email, password, firstName, lastName)
      console.log("Sign Up successful")
      contextSignIn({ email, password })
    } catch (error) {
      console.error("Auth", error)
      setLoading(false)
    }
  }

  const contextSignOut = async () => {
    await SecureStorage.deleteItemAsync("accessToken")
    delete axiosInstance.defaults.headers.common["Authorization"]
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: contextSignIn,
        signOut: contextSignOut,
        signUp: contextSignUp,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
