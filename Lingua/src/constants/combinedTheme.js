import { MD3DarkTheme, MD3LightTheme, configureFonts } from "react-native-paper"
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native"
import { fontConfig } from "@constants/fontConfig"
import { border } from "@constants/globalStyles"
import { lightTheme, darkTheme } from "@constants/colors"

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...NavigationDarkTheme,
  roundness: border.lg,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...NavigationDarkTheme.colors,
    ...MD3DarkTheme.colors,
    ...darkTheme,
  },
}
const CombinedLightTheme = {
  ...MD3LightTheme,
  ...NavigationDefaultTheme,

  fonts: configureFonts({ config: fontConfig }),
  roundness: border.lg,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...MD3LightTheme.colors,
    ...lightTheme,
  },
}

export { CombinedDarkTheme, CombinedLightTheme }
