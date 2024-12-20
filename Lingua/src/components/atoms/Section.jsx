import { spacing } from "@constants/globalStyles"
import { create } from "axios"
import React from "react"
import { StyleSheet, View } from "react-native"
import { Text, useTheme } from "react-native-paper"

export function Section({
  headline,
  children,
  headlineVariant = "headlineSmall",
  contentContainerStyle,
  sectionStyle,
  textColor,
}) {
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)

  return (
    <View style={[styles.container, sectionStyle]}>
      <Text variant={headlineVariant} style={[styles.headline, textColor]}>
        {headline}
      </Text>
      <View style={[styles.content, contentContainerStyle]}>{children}</View>
    </View>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: spacing.md,
    },
    headline: {
      marginBottom: spacing.md,
    },
    content: {
      flex: 1,
      backgroundColor: colors.surfaceVariant,
      padding: spacing.md,

      borderRadius: roundness,
    },
  })
