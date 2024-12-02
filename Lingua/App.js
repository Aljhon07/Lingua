import "@utils/gesture-handler.native"
import React from "react"
import ThemeProvider from "@context/ThemeProvider"
import FontProvider from "@context/FontProvider"
import AuthProvider from "@context/AuthProvider.jsx"
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
