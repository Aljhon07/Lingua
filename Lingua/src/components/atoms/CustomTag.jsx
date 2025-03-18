import { border, spacing } from "@constants/globalStyles"
import { StyleSheet, View } from "react-native"
import { Text, useTheme } from "react-native-paper"

export function CustomTag({ label, backgroundColor, textColor, style }) {
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness, textColor, backgroundColor)
  return (
    // Text to View
    <View style={[styles.container, style]}>
      <Text variant="bodyMedium" style={[styles.label]}>
        {label}
      </Text>
    </View>
  )
}

const createStyles = (colors, roundness, textColor, backgroundColor) =>
  StyleSheet.create({
    container: {
      padding: spacing.md,
      borderRadius: border.md,
      backgroundColor: backgroundColor || colors.background,
      borderWidth: 1,
      borderColor: colors.outline,
    },
    label: {
      color: textColor || colors.outline,
    },
  })
