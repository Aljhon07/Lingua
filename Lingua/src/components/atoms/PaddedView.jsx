import { spacing } from "@constants/globalStyles"
import React from "react"
import { View, StyleSheet } from "react-native"

const PaddedView = ({
  children,
  style,
  horizantal = spacing.lg,
  vertical = 0,
}) => {
  return (
    <View
      style={[
        { paddingHorizontal: horizantal, paddingVertical: vertical },
        style,
      ]}
    >
      {children}
    </View>
  )
}

export default PaddedView
