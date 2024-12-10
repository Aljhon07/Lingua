import React, { createContext, useState, useEffect, useContext } from "react"
import { CombinedDarkTheme, CombinedLightTheme } from "@constants/combinedTheme"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { PaperProvider } from "react-native-paper"
import { Appearance } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"

const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
  const systemColorScheme = Appearance.getColorScheme()
  const [theme, setTheme] = useState(
    systemColorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme
  )
  const [themePreference, setThemePreference] = useState("automatic")

  const setThemePreferenceAndSave = async (preference) => {
    const savedTheme = await AsyncStorage.setItem("theme", preference)
    if (preference) {
      setThemePreference(preference)
      if (preference === "light") {
        setTheme(CombinedLightTheme)
      } else if (preference === "dark") {
        setTheme(CombinedDarkTheme)
      } else {
        setTheme(
          systemColorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme
        )
      }
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
