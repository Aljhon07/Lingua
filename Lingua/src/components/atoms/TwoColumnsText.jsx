import React from "react"
import { StyleSheet, View } from "react-native"
import { Text, useTheme } from "react-native-paper"

export default function TwoColumnsText({
  leftText = "Left Text",
  rightText = "Right Text",
  leftTextVariant = "bodyLarge",
  rightTextVariant = "titleSmall",
}) {
  const { colors } = useTheme()
  const styles = createStyle(colors)
  return (
    <View style={styles.spaceBetween}>
      <Text variant={leftTextVariant} style={styles.text}>
        {leftText}
      </Text>
      <Text variant={rightTextVariant}>{rightText}</Text>
    </View>
  )
}

const createStyle = (colors) =>
  StyleSheet.create({
    spaceBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    text: {
      color: colors.onBackground,
    },
  })
