import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react"
import { CombinedDarkTheme, CombinedLightTheme } from "@constants/combinedTheme"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { PaperProvider } from "react-native-paper"
import { Appearance } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import * as SystemUI from "expo-system-ui"

const ThemeContext = createContext()

const themeReducer = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      const { preference } = action.payload
      let newTheme

      if (preference === "light") {
        newTheme = CombinedLightTheme
      } else if (preference === "dark") {
        newTheme = CombinedDarkTheme
      } else {
        newTheme =
          action.payload.systemColorScheme === "dark"
            ? CombinedDarkTheme
            : CombinedLightTheme
      }

      SystemUI.setBackgroundColorAsync(newTheme.colors.background)

      return {
        ...state,
        themePreference: preference,
        theme: newTheme,
      }
    default:
      return state
  }
}

export default function ThemeProvider({ children }) {
  const systemColorScheme = Appearance.getColorScheme()
  const isInitialized = useRef(false)

  const initialState = {
    themePreference: systemColorScheme === "dark" ? "dark" : "light",
    theme:
      systemColorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme,
  }

  const [state, dispatch] = useReducer(themeReducer, initialState)

  useEffect(() => {
    if (!isInitialized.current) {
      loadSavedTheme()
      isInitialized.current = true
    }
  }, [])

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme")
      if (savedTheme) {
        dispatch({
          type: "SET_THEME",
          payload: { preference: savedTheme, systemColorScheme },
        })
      }
    } catch (error) {
      console.error("Error loading theme:", error)
    }
  }

  const setThemePreferenceAndSave = useCallback(
    async (preference) => {
      if (preference === state.themePreference) return

      try {
        await AsyncStorage.setItem("theme", preference)
        dispatch({
          type: "SET_THEME",
          payload: { preference, systemColorScheme },
        })
      } catch (error) {
        console.error("Error saving theme:", error)
      }
    },
    [state.themePreference, systemColorScheme]
  )

  return (
    <ThemeContext.Provider
      value={{
        themePreference: state.themePreference,
        theme: state.theme,
        setThemePreference: setThemePreferenceAndSave,
      }}
    >
      <PaperProvider key={state.themePreference} theme={state.theme}>
        <StatusBar
          style={state.themePreference === "dark" ? "light" : "dark"}
        />
        <NavigationContainer theme={state.theme}>
          {children}
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
