import { useAuthContext } from "@context/AuthProvider"
import AuthNavigation from "./AuthNavigation"
import MainNavigation from "./MainNavigation"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"

export default function RootNavigator() {
  const { loading, isAuthenticated } = useAuthContext()
  useEffect(() => {
    if (loading) {
      SplashScreen.preventAutoHideAsync()
    } else {
      setTimeout(() => {
        SplashScreen.hideAsync()
      }, 100)
    }
  }, [loading])

  if (loading) {
    return null
  }

  return isAuthenticated ? <MainNavigation /> : <AuthNavigation />
}
