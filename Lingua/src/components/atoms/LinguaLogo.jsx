import { Appearance, Image, StyleSheet } from "react-native"

export function LinguaLogo({ style, light = true }) {
  const logo_light = require("@assets/images/lingua_light.png")
  const logo_dark = require("@assets/images/lingua_dark.png")
  const colors = Appearance.getColorScheme()
  const logo = colors === "dark" ? logo_light : logo_dark
  return <Image source={logo} style={[styles.image, style]} />
}

const styles = StyleSheet.create({
  image: {
    objectFit: "contain",
    width: "99%",
    padding: 0,
  },
})
