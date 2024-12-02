import "@utils/gesture-handler.native"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import ThemeProvider from "@context/ThemeProvider"
import FontProvider from "@context/FontProvider"
import RootNavigator from "@navigation/RootNavigator.jsx"
import AuthProvider from "@context/AuthProvider.jsx"

export default function App() {
  return (
    <ThemeProvider>
      <FontProvider>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </FontProvider>
    </ThemeProvider>
  )
}
