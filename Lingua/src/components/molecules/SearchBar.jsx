import React from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { border, spacing } from "@constants/globalStyles"
import { useThemeContext } from "@context/ThemeProvider"

export function SearchBar() {
  const { colors } = useThemeContext()
  return (
    <View
      style={[
        styles.searchBar,
        {
          backgroundColor: colors.background,
          shadowColor: colors.primary,
        },
      ]}
    >
      <FontAwesome name="search" size={20} color={colors.text} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#888"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: border.xl,
    elevation: 20,
    paddingHorizontal: spacing.lg,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
})
