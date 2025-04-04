import React from "react"
import AuthProvider from "@context/AuthProvider.jsx"
import { useFonts } from "expo-font"
import ThemeProvider from "@context/ThemeProvider"
import RootNavigator from "@navigation/RootNavigator"
import ProfileProvider from "@context/ProfileProvider"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function App() {
  const [loaded] = useFonts({
    "Alegreya-Thin": require("@assets/fonts/Alegreya/AlegreyaSans-Thin.ttf"),
    "Alegreya-Regular": require("@assets/fonts/Alegreya/AlegreyaSans-Regular.ttf"),
    "Alegreya-Medium": require("@assets/fonts/Alegreya/AlegreyaSans-Medium.ttf"),
    "Alegreya-Bold": require("@assets/fonts/Alegreya/AlegreyaSans-Bold.ttf"),
    "Exo2-Medium": require("@assets/fonts/exo2/Exo2-Medium.ttf"),
    "Exo2-Bold": require("@assets/fonts/exo2/Exo2-Bold.ttf"),
  })

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <AuthProvider>
          <ThemeProvider>
            <RootNavigator />
          </ThemeProvider>
        </AuthProvider>
      </ProfileProvider>
    </SafeAreaProvider>
  )
}
