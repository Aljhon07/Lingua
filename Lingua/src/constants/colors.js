const commonColors = {
  primary: "rgb(245, 124, 0)",
  success: "rgb(99, 255, 99)",
  link: "rgb(36, 80, 255)",
  warning: "rgb(255, 71, 71)",
}

// const lightTheme = {
//   primary: "rgb(0, 104, 121)",
//   onPrimary: "rgb(255, 255, 255)",
//   primaryContainer: "rgb(169, 237, 255)",
//   onPrimaryContainer: "rgb(0, 31, 38)",
//   secondary: "rgb(75, 98, 104)",
//   onSecondary: "rgb(255, 255, 255)",
//   secondaryContainer: "rgb(206, 231, 238)",
//   onSecondaryContainer: "rgb(6, 31, 36)",
//   tertiary: "rgb(86, 93, 126)",
//   onTertiary: "rgb(255, 255, 255)",
//   tertiaryContainer: "rgb(221, 225, 255)",
//   onTertiaryContainer: "rgb(18, 26, 55)",
//   successContainer: "#b3ffb3",
//   onSuccessContainer: "#006600",
//   error: "rgb(186, 26, 26)",
//   onError: "rgb(255, 255, 255)",
//   errorContainer: "rgb(255, 218, 214)",
//   onErrorContainer: "rgb(65, 0, 2)",
//   background: "rgb(251, 252, 253)",
//   onBackground: "rgb(25, 28, 29)",
//   surface: "rgb(251, 252, 253)",
//   onSurface: "rgb(25, 28, 29)",
//   surfaceVariant: "rgb(219, 228, 231)",
//   onSurfaceVariant: "rgb(63, 72, 75)",
//   outline: "rgb(111, 121, 123)",
//   outlineVariant: "rgb(191, 200, 203)",
//   shadow: "rgb(0, 0, 0)",
//   scrim: "rgb(0, 0, 0)",
//   inverseSurface: "rgb(46, 49, 50)",
//   inverseOnSurface: "rgb(239, 241, 242)",
//   inversePrimary: "rgb(84, 214, 243)",
//   elevation: {
//     level0: "transparent",
//     level1: "rgb(238, 245, 246)",
//     level2: "rgb(231, 240, 242)",
//     level3: "rgb(223, 236, 239)",
//     level4: "rgb(221, 234, 237)",
//     level5: "rgb(216, 231, 235)",
//   },
//   surfaceDisabled: "rgba(25, 28, 29, 0.12)",
//   onSurfaceDisabled: "rgba(25, 28, 29, 0.38)",
//   backdrop: "rgba(41, 50, 52, 0.4)",
// }

// const darkTheme = {
//   primary: "rgb(84, 214, 243)",
//   onPrimary: "rgb(0, 54, 64)",
//   primaryContainer: "rgb(0, 78, 91)",
//   onPrimaryContainer: "rgb(169, 237, 255)",
//   secondary: "rgb(178, 203, 210)",
//   onSecondary: "rgb(29, 52, 58)",
//   secondaryContainer: "rgb(51, 74, 80)",
//   onSecondaryContainer: "rgb(206, 231, 238)",
//   tertiary: "rgb(190, 197, 235)",
//   onTertiary: "rgb(40, 47, 77)",
//   tertiaryContainer: "rgb(62, 69, 101)",
//   onTertiaryContainer: "rgb(221, 225, 255)",
//   successContainer: "#009900",
//   onSuccessContainer: "#00ff00",
//   error: "rgb(255, 180, 171)",
//   onError: "rgb(105, 0, 5)",
//   errorContainer: "rgb(147, 0, 10)",
//   onErrorContainer: "rgb(255, 180, 171)",
//   background: "rgb(25, 28, 29)",
//   onBackground: "rgb(225, 227, 228)",
//   surface: "rgb(25, 28, 29)",
//   onSurface: "rgb(225, 227, 228)",
//   surfaceVariant: "rgb(63, 72, 75)",
//   onSurfaceVariant: "rgb(191, 200, 203)",
//   outline: "rgb(137, 146, 149)",
//   outlineVariant: "rgb(63, 72, 75)",
//   shadow: "rgb(0, 0, 0)",
//   scrim: "rgb(0, 0, 0)",
//   inverseSurface: "rgb(225, 227, 228)",
//   inverseOnSurface: "rgb(46, 49, 50)",
//   inversePrimary: "rgb(0, 104, 121)",
//   elevation: {
//     level0: "transparent",
//     level1: "rgb(28, 37, 40)",
//     level2: "rgb(30, 43, 46)",
//     level3: "rgb(32, 49, 53)",
//     level4: "rgb(32, 50, 55)",
//     level5: "rgb(33, 54, 59)",
//   },
//   surfaceDisabled: "rgba(225, 227, 228, 0.12)",
//   onSurfaceDisabled: "rgba(225, 227, 228, 0.38)",
//   backdrop: "rgba(41, 50, 52, 0.4)",
// }

const lightTheme = {
  primary: "rgb(245, 124, 0)", // Primary color adjusted to #f57c00 (Orange)
  onPrimary: "rgb(255, 255, 255)", // Text color on primary (white)

  primaryContainer: "rgb(245, 124, 0)", // Same as primary color
  onPrimaryContainer: "rgb(255, 255, 255)", // Text color on primary container (white)

  secondary: "rgb(75, 98, 104)", // Secondary color
  onSecondary: "rgb(255, 255, 255)", // Text color on secondary elements
  secondaryContainer: "rgb(75, 98, 104)", // Same as secondary color
  onSecondaryContainer: "rgb(255, 255, 255)", // Text color on secondary container

  tertiary: "rgb(86, 93, 126)", // Tertiary color
  onTertiary: "rgb(255, 255, 255)", // Text color on tertiary elements
  tertiaryContainer: "rgb(86, 93, 126)", // Same as tertiary color
  onTertiaryContainer: "rgb(255, 255, 255)", // Text color on tertiary container

  successContainer: "rgb(99, 255, 99)", // Success color container (light green)
  onSuccessContainer: "rgb(0, 0, 0)", // Dark text for success container

  error: "rgb(186, 26, 26)", // Error color
  onError: "rgb(255, 255, 255)", // Text color on error
  errorContainer: "rgb(147, 0, 10)", // Background for error container
  onErrorContainer: "rgb(255, 255, 255)", // Text color on error container

  background: "rgb(251, 252, 253)", // Background color
  onBackground: "rgb(25, 28, 29)", // Text color on background

  surface: "rgb(251, 252, 253)", // Surface color
  onSurface: "rgb(25, 28, 29)", // Text color on surface elements

  surfaceVariant: "rgb(219, 228, 231)", // Surface variant
  onSurfaceVariant: "rgb(63, 72, 75)", // Text color on surface variant

  outline: "rgb(111, 121, 123)", // Outline color
  outlineVariant: "rgb(191, 200, 203)", // Outline variant color

  shadow: "rgb(0, 0, 0)", // Shadow color
  scrim: "rgb(0, 0, 0)", // Scrim color

  inverseSurface: "rgb(46, 49, 50)", // Inverse surface color
  inverseOnSurface: "rgb(239, 241, 242)", // Text color on inverse surface

  inversePrimary: "rgb(255, 183, 134)", // Inverse primary color (lighter orange)

  elevation: {
    level0: "transparent",
    level1: "rgb(238, 245, 246)",
    level2: "rgb(231, 240, 242)",
    level3: "rgb(223, 236, 239)",
    level4: "rgb(221, 234, 237)",
    level5: "rgb(216, 231, 235)",
  },

  surfaceDisabled: "rgba(25, 28, 29, 0.12)", // Disabled surface color
  onSurfaceDisabled: "rgba(25, 28, 29, 0.38)", // Disabled text color
  backdrop: "rgba(41, 50, 52, 0.4)", // Backdrop color
}

const darkTheme = {
  primary: "rgb(245, 124, 0)", // #f57c00
  onPrimary: "rgb(0, 0, 0)", // Dark text on primary

  primaryContainer: "rgb(245, 124, 0)", // Same as primary color
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

  inversePrimary: "rgb(245, 124, 0)", // Same as primary color (for inverse)

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
