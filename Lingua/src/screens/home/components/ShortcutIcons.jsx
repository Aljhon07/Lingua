import React from "react"
import { StyleSheet, View, Pressable } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { MaterialIcons, SimpleLineIcons, Feather } from "@expo/vector-icons"
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
        <SimpleLineIcons name="microphone" size={24} color={colors.primary} />
      ),
      label: "Translate",
      onPress: () => navigation.navigate("Translate"),
    },
    {
      id: 2,
      icon: (
        <MaterialIcons name="travel-explore" size={24} color={colors.primary} />
      ),
      label: "Explore",
      onPress: () => navigation.navigate("Explore"),
    },
    {
      id: 3,
      icon: (
        <SimpleLineIcons name="book-open" size={24} color={colors.primary} />
      ),
      label: "Bookings",
      onPress: () => navigation.navigate("Bookings"),
    },
    {
      id: 4,
      icon: (
        <SimpleLineIcons name="graduation" size={24} color={colors.primary} />
      ),
      label: "Learn",
      onPress: () => navigation.navigate("LessonsNavigation"),
    },
    {
      id: 5,
      icon: <Feather name="user" size={24} color={colors.primary} />,
      label: "Profile",
      onPress: () => navigation.navigate("Profile"),
    },
    {
      id: 6,
      icon: <Feather name="user" size={24} color={colors.primary} />,
      label: "Profile",
      onPress: () => navigation.navigate("Profile"),
    },
    {
      id: 7,
      icon: <Feather name="user" size={24} color={colors.primary} />,
      label: "Profile",
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
