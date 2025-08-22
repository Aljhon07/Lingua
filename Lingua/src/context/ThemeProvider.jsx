import React, { createContext, useState, useEffect, useContext } from "react"
import { CombinedDarkTheme, CombinedLightTheme } from "@constants/combinedTheme"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { PaperProvider } from "react-native-paper"
import { Appearance } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
const ThemeContext = createContext()
import * as SystemUI from "expo-system-ui"

export default function ThemeProvider({ children }) {
  const systemColorScheme = Appearance.getColorScheme()

  const [theme, setTheme] = useState(
    systemColorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme
  )
  const [themePreference, setThemePreference] = useState("light")

  useEffect(() => {
    loadSavedTheme()
  }, [])

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme")
      if (savedTheme) {
        setThemePreferenceAndSave(savedTheme)
      } else {
        const systemTheme = systemColorScheme === "dark" ? "dark" : "light"
        setThemePreferenceAndSave(systemTheme)
      }
    } catch (error) {
      console.error("Error loading theme:", error)
      const systemTheme = systemColorScheme === "dark" ? "dark" : "light"
      setThemePreferenceAndSave(systemTheme)
    }
  }

  const setThemePreferenceAndSave = async (preference) => {
    try {
      await AsyncStorage.setItem("theme", preference)
      setThemePreference(preference)

      if (preference === "light") {
        setTheme(CombinedLightTheme)
        SystemUI.setBackgroundColorAsync(CombinedLightTheme.colors.background)
      } else if (preference === "dark") {
        setTheme(CombinedDarkTheme)
        SystemUI.setBackgroundColorAsync(CombinedDarkTheme.colors.background)
      } else {
        const newTheme =
          systemColorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme
        setTheme(newTheme)
        SystemUI.setBackgroundColorAsync(newTheme.colors.background)
      }
    } catch (error) {
      console.error("Error saving theme:", error)
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        themePreference,
        theme,
        setThemePreference: setThemePreferenceAndSave,
      }}
    >
      <PaperProvider theme={theme}>
        <StatusBar style={themePreference === "dark" ? "light" : "dark"} />
        <NavigationContainer theme={theme}>{children}</NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
