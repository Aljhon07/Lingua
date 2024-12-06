import { MD3DarkTheme, MD3LightTheme, configureFonts } from "react-native-paper"
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native"
import { commonColors } from "@constants/colors"
import { fontConfig } from "@constants/fontConfig"
import { border } from "@constants/globalStyles"

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...NavigationDarkTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...NavigationDarkTheme.colors,
    ...MD3DarkTheme.colors,
    ...commonColors,
  },
}
const CombinedLightTheme = {
  ...MD3LightTheme,
  ...NavigationDefaultTheme,

  fonts: configureFonts({ config: fontConfig }),
  roundness: border.md,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...MD3LightTheme.colors,
    ...commonColors,
  },
}

export { CombinedDarkTheme, CombinedLightTheme }
