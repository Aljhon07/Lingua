import { createContext, useState, useContext, useEffect } from "react"
import { refreshTokens, removeTokens } from "@utils/TokenManager"
import { signIn, signUp } from "@services/directus/auth"
import * as SecureStorage from "expo-secure-store"
import { axiosInstance } from "@utils/axiosInstance"

export const AuthContext = createContext()
export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState({
    isError: false,
    message: "",
    res: null,
  })

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await SecureStorage.getItemAsync("accessToken")
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`
        if (token) setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }
    checkAuthStatus()
    setIsAuthenticated(false)
  }, [])

  const contextSignIn = async ({ email, password }) => {
    try {
      const res = await signIn(email, password)
      setIsAuthenticated(true)
      console.log("Sign in successful")
    } catch (error) {
      console.error("Auth", error.responseData[0])
      setStatus({
        isError: true,
        message: error.responseData[0],
        res: error.response,
      })
    }
  }

  const contextSignUp = async ({ email, password, firstName, lastName }) => {
    try {
      const res = await signUp(email, password, firstName, lastName)
      console.log("Sign Up successful")
      contextSignIn({ email, password })
    } catch (error) {
      console.error("Auth", error.responseData)
      setStatus({
        isError: true,
        message: error.responseData[0],
        res: error.response,
      })
    }
  }

  const contextSignOut = async () => {
    await SecureStorage.deleteItemAsync("accessToken")
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
