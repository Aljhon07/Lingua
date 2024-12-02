import { useAuthContext } from "@context/AuthProvider"
import AuthNavigation from "./AuthNavigation"
import MainTab from "./MainTab"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"

export default function RootNavigator() {
  const { loading, isAuthenticated } = useAuthContext()
  useEffect(() => {
    if (loading) {
      SplashScreen.preventAutoHideAsync()
    } else {
      SplashScreen.hideAsync()
    }
  }, [loading])

  if (loading) {
    return null
  }

  return isAuthenticated ? <MainTab /> : <AuthNavigation />
}
