import { createContext, useState, useContext, useEffect } from "react"
import { CombinedDarkTheme, CombinedLightTheme } from "@utils/combinedTheme"
import { Appearance } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { PaperProvider } from "react-native-paper"
import { StatusBar } from "expo-status-bar"

export const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
  const colorScheme = Appearance.getColorScheme()
  const [theme, setTheme] = useState(
    colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme
  )

  const toggleTheme = () => {
    setTheme(
      theme === CombinedLightTheme ? CombinedDarkTheme : CombinedLightTheme
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <PaperProvider theme={theme}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <NavigationContainer theme={theme}>{children}</NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
