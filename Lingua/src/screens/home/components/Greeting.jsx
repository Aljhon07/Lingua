import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme, IconButton } from "react-native-paper";
import { spacing } from "@constants/globalStyles";
import { useProfileContext } from "@context/ProfileProvider";
import { useThemeContext } from "@context/ThemeProvider";
import PaddedView from "@components/atoms/PaddedView";

export default function Greeting() {
  const { profile } = useProfileContext();
  const { colors } = useTheme();
  const { themePreference, setThemePreference } = useThemeContext();
  const styles = createStyles(colors);

  const isDarkTheme = themePreference === "dark";

  const handleThemeToggle = () => {
    setThemePreference(isDarkTheme ? "light" : "dark");
  };

  return (
    <PaddedView style={styles.greetingContainer}>
      <View style={styles.headerRow}>
        <View style={styles.greetingContent}>
          <Text variant="headlineLarge" style={styles.greetingText}>
            Welcome back, {profile.first_name}!
          </Text>
          <Text variant="bodyLarge" style={styles.subGreeting}>
            Ready for your next adventure?
          </Text>
        </View>
        <IconButton
          icon={isDarkTheme ? "white-balance-sunny" : "moon-waning-crescent"}
          iconColor={colors.primary}
          size={28}
          onPress={handleThemeToggle}
          style={styles.themeToggleButton}
        />
      </View>
    </PaddedView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    greetingContainer: {
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    greetingContent: {
      flex: 1,
      gap: spacing.sm,
      marginRight: spacing.md,
    },
    greetingText: {
      color: colors.primary,
    },
    subGreeting: {
      color: colors.primary,
    },
    themeToggleButton: {
      margin: 0,
      backgroundColor: colors.surfaceVariant,
    },
  });
