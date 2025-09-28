import React from "react"
import { StyleSheet, ScrollView, View } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import StyledSurface from "@components/atoms/StyledSurface"
import PaddedView from "@components/atoms/PaddedView"
import { Section } from "@components/atoms/Section"

export default function TipsSection() {
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)

  const travelTips = [
    {
      id: 1,
      tip: "Pack light - you can always buy what you need locally!",
      category: "Packing",
    },

    {
      id: 3,
      tip: "Learn basic vocabulary and phrases in the local language for better interactions.",
      category: "Communication",
    },

    {
      id: 4,
      tip: "Keep digital copies of important documents in cloud storage.",
      category: "Documents",
    },
    {
      id: 5,
      tip: "Try local street food, but choose busy stalls for freshness.",
      category: "Food",
    },
  ]

  return (
    <PaddedView>
      <Section
        headline="Travel Tips"
        headlineVariant="titleMedium"
        contentContainerStyle={styles.section}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {travelTips.map((item) => (
            <View key={item.id} style={styles.tipCard}>
              <StyledSurface style={styles.tipContent}>
                <Text variant="labelSmall" style={styles.category}>
                  {item.category}
                </Text>
                <Text variant="bodyMedium" style={styles.tipText}>
                  {item.tip}
                </Text>
              </StyledSurface>
            </View>
          ))}
        </ScrollView>
      </Section>
    </PaddedView>
  )
}
const createStyles = (colors, roundness) =>
  StyleSheet.create({
    section: {
      backgroundColor: "transparent",
    },
    scrollContainer: {
      paddingHorizontal: spacing.sm,
      gap: spacing.md,
      alignItems: "stretch", // 🔑 makes all children match tallest one
    },
    tipCard: {
      width: 200,
      marginRight: spacing.sm,
      flexGrow: 1, // allow equal growth
    },
    tipContent: {
      flex: 1, // 🔑 makes each card fill equal height
      padding: spacing.md,
      gap: spacing.sm,
    },
    category: {
      color: colors.primary,
      fontWeight: "600",
      textTransform: "uppercase",
    },
    tipText: {
      color: colors.onSurface,
      lineHeight: 20,
      flexShrink: 1,
    },
  })
