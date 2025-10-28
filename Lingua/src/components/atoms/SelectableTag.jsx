import { border, spacing } from "@constants/globalStyles";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";

export function SelectableTag({ label, isSelected, onPress, style }) {
  const { colors, roundness } = useTheme();
  const styles = createStyles(colors, roundness, isSelected);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text variant="bodyMedium" style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const createStyles = (colors, roundness, isSelected) =>
  StyleSheet.create({
    container: {
      padding: spacing.md,
      borderRadius: border.md,
      backgroundColor: isSelected ? colors.primary : colors.background,
      borderWidth: 1,
      borderColor: isSelected ? colors.primary : colors.outline,
    },
    label: {
      color: isSelected ? colors.onPrimary : colors.onBackground,
      fontWeight: isSelected ? "600" : "400",
    },
  });
