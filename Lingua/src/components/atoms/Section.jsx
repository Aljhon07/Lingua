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
}) {
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)

  return (
    <View style={[styles.container, sectionStyle]}>
      <Text variant={headlineVariant} style={[styles.headline]}>
        {headline}
      </Text>
      <View style={[styles.content, contentContainerStyle]}>{children}</View>
    </View>
  )
}

const createStyles = (colors, roundness) =>
  // removed flex: 1 from container and content
  StyleSheet.create({
    container: {},
    headline: {
      marginBottom: spacing.md,
    },
    content: {},
  })
