import {
  MD3DarkTheme,
  MD3LightTheme,
  configureFonts,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { fontConfig } from "@constants/fontConfig";
import { border } from "@constants/globalStyles";
import { lightTheme, darkTheme, commonColors } from "@constants/colors";

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...NavigationDarkTheme,
  roundness: border.md,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...NavigationDarkTheme.colors,
    ...MD3DarkTheme.colors,
    ...commonColors,
    ...darkTheme,
  },
};
const CombinedLightTheme = {
  ...MD3LightTheme,
  ...NavigationDefaultTheme,

  fonts: configureFonts({ config: fontConfig }),
  roundness: border.md,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...MD3LightTheme.colors,
    ...commonColors,
    ...lightTheme,
  },
};

export { CombinedDarkTheme, CombinedLightTheme };
