import { LinguaLogo } from "@components/atoms/LinguaLogo"
import { border, spacing } from "@constants/globalStyles"
import { ImageBackground, KeyboardAvoidingView, View } from "react-native"
import { StyleSheet } from "react-native"

export default function AuthenticationForm({ children }) {
  const bg_1 = require("@assets/images/background_1.jpg")
  const bg_2 = require("@assets/images/background_2.jpg")

  return (
    <ImageBackground
      source={bg_1}
      style={styles.imageBackground}
      imageStyle={styles.bgImageStyle}
    >
      <View style={styles.container}>
        <LinguaLogo light={false} style={styles.logo} />
        <View>{children}</View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xxl,
    flex: 1,
  },
  container: {
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: border.md,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },

  logo: {
    width: "80%",
    alignSelf: "center",
  },
})
