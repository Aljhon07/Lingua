import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { spacing } from "@constants/globalStyles"
import { LinkText } from "@components/atoms/LinkText"

export function TermsCheckbox({
  checked,
  onToggle,
  onPressTerms,
  onPressPrivacy,
  style,
}) {
  const { colors } = useTheme()
  const styles = createStyles(colors)

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={onToggle}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
      >
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && (
            <MaterialCommunityIcons
              name="check"
              size={16}
              color={colors.onPrimary}
            />
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text variant="bodyMedium" style={styles.text}>
          I agree to the{" "}
          <LinkText onPress={onPressTerms}>Terms and Conditions</LinkText> and{" "}
          <LinkText onPress={onPressPrivacy}>Privacy Policy</LinkText>
        </Text>
      </View>
    </View>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: spacing.sm,
    },
    checkboxContainer: {
      padding: spacing.xs,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: colors.outline,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.surface,
    },
    checkboxChecked: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    textContainer: {
      flex: 1,
      paddingTop: spacing.xs,
    },
    text: {
      color: colors.onBackground,
      lineHeight: 20,
    },
  })
