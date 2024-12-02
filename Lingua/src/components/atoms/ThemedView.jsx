import { useThemeContext } from "@context/ThemeProvider"
import { View } from "react-native"

export function ThemedView({ children, style }) {
  const { colors } = useThemeContext()
  return (
    <View style={[{ backgroundColor: "transparent" }, style]}>{children}</View>
  )
}
