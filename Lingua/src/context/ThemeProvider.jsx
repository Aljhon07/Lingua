import { createContext, useState, useContext } from "react"
import { commons, darkTheme, lightTheme } from "@constants/colors"
import { MD3DarkTheme, MD3LightTheme, configureFonts } from "react-native-paper"
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native"
import { fontConfig } from "@constants/fontConfig"

export const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme)

  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...NavigationDarkTheme,
    fonts: configureFonts({ config: fontConfig }),
    colors: {
      ...NavigationDarkTheme.colors,
      ...MD3DarkTheme.colors,
      ...commons,
    },
  }
  const CombinedLightTheme = {
    ...MD3LightTheme,
    ...NavigationDefaultTheme,
    fonts: configureFonts({ config: fontConfig }),
    colors: {
      ...NavigationDefaultTheme.colors,
      ...MD3LightTheme.colors,
      ...commons,
    },
  }

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }

  return (
    <ThemeContext.Provider value={{ colors: theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
