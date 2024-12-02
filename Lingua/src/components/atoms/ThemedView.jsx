import React from "react"
import { View, StyleSheet } from "react-native"
import { useThemeContext } from "@context/ThemeProvider"

export default function ThemedView({ style, children, ...props }) {
  const { colors } = useThemeContext()

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }, style]}
      {...props}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
