import { useAuthContext } from "@context/AuthProvider"
import AuthNavigation from "./AuthNavigation"
import MainNavigation from "./MainNavigation"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { Text } from "react-native-paper"

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

  return isAuthenticated ? <MainNavigation /> : <AuthNavigation />
}
