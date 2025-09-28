import React from "react"
import { StyleSheet, View } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { useProfileContext } from "@context/ProfileProvider"
import PaddedView from "@components/atoms/PaddedView"

export default function Greeting() {
  const { profile } = useProfileContext()
  const { colors } = useTheme()
  const styles = createStyles(colors)

  return (
    <PaddedView style={styles.greetingContainer}>
      <View style={styles.greetingContent}>
        <Text variant="headlineLarge" style={styles.greetingText}>
          Welcome back, {profile.first_name}!
        </Text>
        <Text variant="bodyLarge" style={styles.subGreeting}>
          Ready for your next adventure?
        </Text>
      </View>
    </PaddedView>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    greetingContainer: {
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,
    },
    greetingContent: {
      gap: spacing.sm,
    },
    greetingText: {
      color: colors.primary,
    },
    subGreeting: {
      color: colors.primary,
    },
  })
