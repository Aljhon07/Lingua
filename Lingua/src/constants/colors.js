const commonColors = {
  primary: "rgba(0, 254, 144, 1)",
  success: "rgb(99, 255, 99)",
  link: "rgb(36, 80, 255)",
  warning: "rgb(255, 71, 71)",
}

const lightTheme = {
  primary: "rgba(12, 107, 66, 1)",
  onPrimary: "rgb(255, 255, 255)",

  primaryContainer: "rgba(0, 126, 71, 1)",
  onPrimaryContainer: "rgb(255, 255, 255)",

  secondary: "rgb(75, 98, 104)",
  onSecondary: "rgb(255, 255, 255)",
  secondaryContainer: "rgb(230, 235, 236)", // lighter background for chips/cards
  onSecondaryContainer: "rgb(31, 42, 44)", // darker text on light secondary container

  tertiary: "rgb(86, 93, 126)",
  onTertiary: "rgb(255, 255, 255)",
  tertiaryContainer: "rgb(229, 230, 240)",
  onTertiaryContainer: "rgb(36, 40, 60)",

  successContainer: "rgb(218, 247, 223)",
  onSuccessContainer: "rgb(0, 98, 50)",

  error: "rgb(186, 26, 26)",
  onError: "rgb(255, 255, 255)",
  errorContainer: "rgb(255, 218, 214)",
  onErrorContainer: "rgb(65, 14, 11)",

  background: "rgb(251, 252, 253)",
  onBackground: "rgb(33, 37, 41)", // darker gray for text on white

  surface: "rgb(255, 255, 255)", // pure white for cards/surfaces
  onSurface: "rgb(33, 37, 41)", // dark gray text (better contrast)

  surfaceVariant: "rgb(238, 241, 243)",
  onSurfaceVariant: "rgb(73, 85, 89)",

  outline: "rgb(120, 131, 134)",
  outlineVariant: "rgb(200, 208, 211)",

  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",

  inverseSurface: "rgb(46, 49, 50)",
  inverseOnSurface: "rgb(239, 241, 242)",

  inversePrimary: "rgb(0, 180, 110)", // a brighter green for inverse

  elevation: {
    level0: "transparent",
    level1: "rgb(247, 249, 249)",
    level2: "rgb(242, 245, 246)",
    level3: "rgb(238, 241, 242)",
    level4: "rgb(236, 239, 240)",
    level5: "rgb(232, 236, 237)",
  },

  surfaceDisabled: "rgba(33, 37, 41, 0.12)",
  onSurfaceDisabled: "rgba(33, 37, 41, 0.38)",
  backdrop: "rgba(41, 50, 52, 0.4)",
}

const darkTheme = {
  primary: "rgba(0, 254, 144, 1)", // #f57c00
  onPrimary: "rgb(0, 0, 0)", // Dark text on primary

  primaryContainer: "rgba(0, 254, 144, 1)", // Same as primary color
  onPrimaryContainer: "rgb(0, 0, 0)", // Text color on primary container (black)

  secondary: "rgb(75, 98, 104)", // Secondary color
  onSecondary: "rgb(255, 255, 255)", // Text color on secondary elements
  secondaryContainer: "rgb(75, 98, 104)", // Same as secondary color
  onSecondaryContainer: "rgb(255, 255, 255)", // Text color on secondary container

  tertiary: "rgb(86, 93, 126)", // Tertiary color
  onTertiary: "rgb(255, 255, 255)", // Text color on tertiary elements
  tertiaryContainer: "rgb(86, 93, 126)", // Same as tertiary color
  onTertiaryContainer: "rgb(255, 255, 255)", // Text color on tertiary container

  error: "rgb(186, 26, 26)", // Error color
  onError: "rgb(255, 255, 255)", // Text color on error
  errorContainer: "rgb(147, 0, 10)", // Background for error container
  onErrorContainer: "rgb(255, 255, 255)", // Text color on error container

  background: "rgb(25, 28, 29)", // Dark background for dark theme
  onBackground: "rgb(193, 196, 197)", // Light text on dark background

  surface: "rgb(25, 28, 29)", // Dark surface for dark theme
  onSurface: "rgb(225, 227, 228)", // Light text on dark surface

  surfaceVariant: "rgb(63, 72, 75)", // Slightly muted surface variant for dark theme
  onSurfaceVariant: "rgb(191, 200, 203)", // Muted light text on surface variant

  outline: "rgb(137, 146, 149)",
  outlineVariant: "rgb(63, 72, 75)",
  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",

  inverseSurface: "rgb(225, 227, 228)", // Light inverse surface color
  inverseOnSurface: "rgb(46, 49, 50)", // Dark text on inverse surface

  inversePrimary: "rgba(0, 254, 144, 1)", // Same as primary color (for inverse)

  elevation: {
    level0: "transparent",
    level1: "rgb(28, 37, 40)",
    level2: "rgb(30, 43, 46)",
    level3: "rgb(32, 49, 53)",
    level4: "rgb(32, 50, 55)",
    level5: "rgb(33, 54, 59)",
  },

  surfaceDisabled: "rgba(225, 227, 228, 0.12)",
  onSurfaceDisabled: "rgba(225, 227, 228, 0.38)",
  backdrop: "rgba(41, 50, 52, 0.4)",
}

export { darkTheme, lightTheme, commonColors }
