import { createContext, useState, useContext, useEffect } from "react"
import { signIn, signUp } from "@services/directus"
import { getItemAsync, deleteItemAsync } from "expo-secure-store"
import { setAuthToken } from "@utils/axiosInstance"

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
      const token = await getItemAsync("access_token")
      if (token) {
        setAuthToken(token)
        setIsAuthenticated(true)
      }

      setLoading(false)
    }
    checkAuthStatus()

    const removeTokens = () => {
      deleteItemAsync("access_token")
      deleteItemAsync("refresh_token")
    }

    return () => removeTokens()
  }, [])

  const contextSignIn = async ({ email, password }) => {
    try {
      const res = await signIn(email, password)
      if (res.isError) {
        throw new Error(res.message)
      }
      setStatus({ isError: false, message: res.message })
      setIsAuthenticated(true)
    } catch (error) {
      setStatus({ isError: true, message: error.message })
    }
  }

  const contextSignUp = async ({ email, password, firstName, lastName }) => {
    try {
      const res = await signUp(email, password, firstName, lastName)
      if (res.isError) {
        throw new Error(res.message)
      }
      await contextSignIn({ email, password })
    } catch (error) {
      setStatus({ isError: true, message: error.message, user: null })
    }
  }

  const contextSignOut = async () => {
    await deleteItemAsync("access_token")
    await deleteItemAsync("refresh_token")
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: contextSignIn,
        signOut: contextSignOut,
        signUp: contextSignUp,
        status,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
