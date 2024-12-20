import React from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { useTheme, Text, ActivityIndicator } from "react-native-paper"

export function CustomButton({
  onPress,
  children,
  style,
  textStyle,
  containerStyle,
  textVariant = "labelLarge",
  primary = false,
  loading = false,
  props,
}) {
  const { roundness, colors } = useTheme()
  const styles = createStyles(roundness, colors, primary)
  return (
    <View style={[styles.buttonView, containerStyle]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "rgba(176, 176, 176, 0.4)", borderless: true }}
        style={[styles.button, style]}
        {...props}
      >
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          <Text variant={textVariant} style={[styles.text, textStyle]}>
            {children}
          </Text>
        )}
      </Pressable>
    </View>
  )
}

const createStyles = (roundness, colors, primary) =>
  StyleSheet.create({
    buttonView: {
      alignSelf: "stretch",
      justifyContent: "center",
      borderRadius: roundness,
      backgroundColor: "transparent",
      overflow: "hidden",
    },
    button: {
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: primary ? colors.primary : colors.onPrimary,
      borderWidth: primary ? 0 : 1,
      borderColor: colors.outline,
      borderRadius: roundness,
      overflow: "hidden",
    },
    text: {
      color: primary ? colors.onPrimary : colors.primary,
    },
  })
