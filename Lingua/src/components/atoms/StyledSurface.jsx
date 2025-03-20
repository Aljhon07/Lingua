import { spacing } from "@constants/globalStyles"
import React from "react"
import { Surface, useTheme } from "react-native-paper"

export default function StyledSurface({ children, elevation = 2 }) {
  const { colors } = useTheme()
  return (
    <Surface
      style={{
        borderRadius: spacing.md,
        padding: spacing.lg,
        gap: spacing.lg,
        shadowColor: colors.primary,
        backgroundColor: colors.surface,
        marginBottom: spacing.lg,
      }}
      elevation={elevation}
    >
      {children}
    </Surface>
  )
}
