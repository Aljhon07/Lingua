import { useThemeContext } from "@context/ThemeProvider"
import { Appearance, Image, StyleSheet } from "react-native"

export function LinguaLogo({ style }) {
  const logo_light = require("@assets/images/lingua_light.png")
  const logo_dark = require("@assets/images/lingua_dark.png")
  const { themePreference } = useThemeContext()
  console.log("Theme: ", themePreference)
  const logo = themePreference == "light" ? logo_dark : logo_light
  return <Image source={logo} style={[styles.image, style]} />
}

const styles = StyleSheet.create({
  image: {
    objectFit: "contain",
    width: "99%",
    padding: 0,
  },
})
