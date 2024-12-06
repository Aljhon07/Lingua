import { createContext, useState, useContext, useEffect } from "react"
import { refreshTokens } from "@utils/TokenManager"
import { signIn } from "@services/directus/auth"
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
        const tokens = await refreshTokens()
        if (tokens) setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }
    checkAuthStatus()

    // const removeTokens = () => {
    //   SecureStorage.deleteItemAsync("accessToken")
    //   SecureStorage.deleteItemAsync("refreshToken")
    // }
    // return () => removeTokens()
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

  const contextSignUp = async ({ email, password, firstName, lastName }) => {}

  const contextSignOut = async () => {}

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
