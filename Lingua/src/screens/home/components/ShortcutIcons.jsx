import React from "react"
import { StyleSheet, View, Pressable } from "react-native"
import { Text, useTheme } from "react-native-paper"
import {
  MaterialIcons,
  SimpleLineIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons"
import { spacing } from "@constants/globalStyles"
import { useNavigation } from "@react-navigation/native"
import PaddedView from "@components/atoms/PaddedView"
import { Section } from "@components/atoms/Section"

export default function ShortcutIcons() {
  const navigation = useNavigation()
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)

  const shortcuts = [
    {
      id: 1,
      icon: (
        <MaterialCommunityIcons
          name="ticket-confirmation"
          size={24}
          color={colors.primary}
        />
      ),
      label: "Purchases",
      onPress: () => navigation.navigate("Bookings"),
    },
    {
      id: 2,
      icon: <MaterialIcons name="map" size={24} color={colors.primary} />,
      label: "Itinerary",
      onPress: () => navigation.navigate("ItineraryScreen"),
    },
    {
      id: 3,
      icon: <Feather name="user" size={24} color={colors.primary} />,
      label: "Accounts",
      onPress: () => navigation.navigate("Profile"),
    },
  ]

  return (
    <PaddedView>
      <Section
        headline="Quick Actions"
        headlineVariant="titleMedium"
        contentContainerStyle={styles.section}
      >
        <View style={styles.shortcutsContainer}>
          {shortcuts.map((shortcut) => (
            <Pressable
              key={shortcut.id}
              style={styles.shortcutItem}
              onPress={shortcut.onPress}
            >
              <View style={styles.iconContainer}>{shortcut.icon}</View>
              <Text variant="labelMedium" style={styles.shortcutLabel}>
                {shortcut.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </Section>
    </PaddedView>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    section: {
      backgroundColor: "transparent",
    },
    shortcutsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start", // ✅ align left instead of spreading
      alignItems: "center",
      paddingVertical: spacing.md,
    },
    shortcutItem: {
      alignItems: "center",
      justifyContent: "center",
      width: "20%", // ✅ exactly 5 per row
      marginBottom: spacing.md,
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: roundness * 2,
      backgroundColor: colors.surfaceVariant,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: colors.outline,
    },
    shortcutLabel: {
      textAlign: "center",
      color: colors.onSurface,
    },
  })
