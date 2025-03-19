import { useAuthContext } from "@context/AuthProvider"
import AuthNavigation from "./AuthNavigation"
import MainNavigation from "./MainNavigation"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import TravelPackagesProvider from "@context/TravelPackagesProvider"
import { Text } from "react-native-paper"

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

  return isAuthenticated ? (
    <TravelPackagesProvider>
      <MainNavigation />
    </TravelPackagesProvider>
  ) : (
    <AuthNavigation />
  )
}
