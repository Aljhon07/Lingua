import "@utils/gesture-handler.native"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import ThemeProvider from "@context/ThemeProvider"
import FontProvider from "@context/FontProvider"
import AuthProvider from "@context/AuthProvider.jsx"
import RootNavigator from "@navigation/RootNavigator"
import ThemedApp from "@components/layouts/ThemedApp"

export default function App() {
  return (
    <ThemeProvider>
      <FontProvider>
        <AuthProvider>
          <ThemedApp />
        </AuthProvider>
      </FontProvider>
    </ThemeProvider>
  )
}
