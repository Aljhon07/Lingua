import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { spacing } from "@constants/globalStyles";

const TopSkipButton = ({ onSkip, show = true }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  if (!show) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSkip} style={styles.button}>
        <Text variant="labelLarge" style={styles.text}>
          Skip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: spacing.lg,
      right: spacing.lg,
      zIndex: 10,
    },
    button: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    text: {
      color: colors.onSurfaceVariant,
    },
  });

export default TopSkipButton;
