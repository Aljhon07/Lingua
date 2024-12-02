import { createContext, useState, useContext } from "react"
import { darkTheme, lightTheme } from "@constants/colors"

export const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme)

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
