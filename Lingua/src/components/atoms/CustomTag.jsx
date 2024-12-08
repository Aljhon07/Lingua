import { spacing } from "@constants/globalStyles"
import { StyleSheet, View } from "react-native"
import { Text, useTheme } from "react-native-paper"

export function CustomTag({ label, backgroundColor, textColor, style }) {
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness, textColor, backgroundColor)
  return (
    <View style={[styles.container, style]}>
      <Text variant="labelLarge" style={[styles.label]}>
        {label}
      </Text>
    </View>
  )
}

const createStyles = (colors, roundness, textColor, backgroundColor) =>
  StyleSheet.create({
    container: {
      padding: spacing.md,
      borderRadius: roundness,
      backgroundColor: backgroundColor || colors.primaryContainer,
    },
    label: {
      color: textColor || colors.onPrimaryContainer,
    },
  })
