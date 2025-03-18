import { border } from "@constants/globalStyles"
import React from "react"
import { Pressable, StyleSheet, View } from "react-native"
import {
  useTheme,
  Text,
  ActivityIndicator,
  Button,
  Icon,
} from "react-native-paper"

export function CustomButton({
  onPress,
  style,
  primary = false,
  loading = false,
  icon,
  iconSize = 24,
  contentStyle,
  props,
  children,
}) {
  const { roundness, colors } = useTheme()
  const styles = createStyles(roundness, colors, primary)
  return (
    <Button
      mode={primary ? "contained" : "outlined"}
      style={[style, styles.button]}
      onPress={onPress}
      loading={loading}
      icon={() => (
        <Icon source={icon} size={iconSize} color={colors.onPrimary} />
      )}
      contentStyle={contentStyle}
      labelStyle={{ fontFamily: "Alegreya-Medium", fontSize: 17 }}
      {...props}
    >
      {children}
    </Button>
  )
}

const createStyles = (roundness) =>
  StyleSheet.create({
    button: {
      borderRadius: border.md,
    },
  })
