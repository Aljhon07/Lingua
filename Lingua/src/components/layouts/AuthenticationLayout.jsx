import { LinguaLogo } from "@components/atoms/LinguaLogo"
import { border, spacing } from "@constants/globalStyles"
import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
import { StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"

export default function AuthenticationForm({ children }) {
  const bg_1 = require("@assets/images/background_1.jpg")
  const bg_2 = require("@assets/images/background_2.jpg")
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor=""></StatusBar>
      <LinguaLogo light={true} style={styles.logo} />
      <View style={styles.content}>{children}</View>
    </View>
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
    flex: 1,
    paddingVertical: spacing.sm,
    width: "100%",
  },
  content: {
    flex: 1,
  },
  logo: {
    width: "80%",
    alignSelf: "center",
    marginBottom: spacing.md,
  },
})
