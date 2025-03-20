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
  leftComponent,
  rightComponent,
  flexValue = 1,
}) {
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness, flexValue)

  return (
    <View style={[styles.container, sectionStyle]}>
      <View style={styles.header}>
        {leftComponent ? leftComponent : null}
        <Text variant={headlineVariant} style={[styles.headline]}>
          {headline}
        </Text>
        {rightComponent ? rightComponent : null}
      </View>
      <View style={[styles.content, contentContainerStyle]}>{children}</View>
    </View>
  )
}

const createStyles = (colors, roundness, flexValue) =>
  StyleSheet.create({
    container: {
      flex: flexValue,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headline: {
      marginBottom: spacing.sm,
      marginRight: "auto",
    },
    content: {
      flex: flexValue,
    },
  })
