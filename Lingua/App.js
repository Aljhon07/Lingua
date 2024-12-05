import "@utils/gesture-handler.native"
import React from "react"
import ThemeProvider from "@context/ThemeProvider"
import FontProvider from "@context/FontProvider"
import AuthProvider from "@context/AuthProvider.jsx"
import RootNavigator from "@navigation/RootNavigator"
import {
  PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  configureFonts,
} from "react-native-paper"
import {
  DarkTheme,
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import { useFonts } from "expo-font"
import { fontConfig } from "@constants/fontConfig"
import { commons } from "@constants/colors"

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

  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...NavigationDarkTheme,
    fonts: configureFonts({ config: fontConfig }),
    roundness: 2,
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
    roundness: 2,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...MD3LightTheme.colors,
      ...commons,
    },
  }

  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <ThemeProvider>
        <FontProvider>
          <AuthProvider>
            <NavigationContainer theme={CombinedDarkTheme}>
              <StatusBar style="light" />
              <RootNavigator />
            </NavigationContainer>
          </AuthProvider>
        </FontProvider>
      </ThemeProvider>
    </PaperProvider>
  )
}
