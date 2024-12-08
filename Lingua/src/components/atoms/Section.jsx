import { spacing } from "@constants/globalStyles"
import { create } from "axios"
import React from "react"
import { StyleSheet, View } from "react-native"
import { Text, useTheme } from "react-native-paper"

export function Section({
  headline,
  children,
  headlineVariant = "headlineSmall",
}) {
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)

  return (
    <View style={styles.container}>
      <Text variant={headlineVariant} style={styles.headline}>
        {headline}
      </Text>
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    headline: {
      marginBottom: spacing.md,
    },
    content: {},
  })
