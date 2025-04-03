import React from "react"
import { CustomButton } from "./CustomButton"
import { StyleSheet, View } from "react-native"
import { spacing } from "@constants/globalStyles"

export default function ButtonPair({
  onPressLeft,
  onPressRight,
  leftText = "Left",
  rightText = "Right",
  style,
}) {
  return (
    <View style={[styles.wrapper, style]}>
      <CustomButton onPress={onPressLeft} style={styles.button}>
        {leftText}
      </CustomButton>
      <CustomButton primary onPress={onPressRight} style={styles.button}>
        {rightText}
      </CustomButton>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.lg,
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
})
