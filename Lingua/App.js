import "@utils/gesture-handler.native"
import React from "react"
import AuthProvider from "@context/AuthProvider.jsx"
import { useFonts } from "expo-font"
import ThemeProvider from "@context/ThemeProvider"
import RootNavigator from "@navigation/RootNavigator"

export default function App() {
  const [loaded] = useFonts({
    "Merriweather-Regular": require("@assets/fonts/Merriweather-Regular.ttf"),
    "Merriweather-Bold": require("@assets/fonts/Merriweather-Bold.ttf"),
    "Merriweather-Black": require("@assets/fonts/Merriweather-Black.ttf"),
    "CrimsonText-Regular": require("@assets/fonts/CrimsonText-Regular.ttf"),
    "CrimsonText-Bold": require("@assets/fonts/CrimsonText-Bold.ttf"),
  })

  if (!loaded) {
    return null
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </AuthProvider>
  )
}
