import { border } from "@constants/globalStyles";
import React from "react";
import { StyleSheet } from "react-native";
import { IconButton, useTheme, Button, Icon } from "react-native-paper";
import { spacing } from "@constants/globalStyles";
import { useNavigation } from "@react-navigation/native";

export function CustomButton({
  onPress,
  style,
  primary = false,
  loading = false,
  icon,
  iconSize = 24,
  iconColor,
  contentStyle,
  props,
  children,
}) {
  const { roundness, colors } = useTheme();
  const styles = createStyles(roundness, colors, primary);

  // Use provided iconColor or default based on mode
  const defaultIconColor = primary ? colors.onPrimary : colors.primary;
  const finalIconColor = iconColor || defaultIconColor;

  return (
    <Button
      mode={primary ? "contained" : "outlined"}
      style={[styles.button, style]}
      onPress={onPress}
      loading={loading}
      disabled={loading}
      icon={
        icon
          ? () => <Icon source={icon} size={iconSize} color={finalIconColor} />
          : undefined
      }
      contentStyle={contentStyle}
      labelStyle={{ fontFamily: "Alegreya-Medium", fontSize: 17 }}
      {...props}
    >
      {children}
    </Button>
  );
}

const createStyles = (roundness) =>
  StyleSheet.create({
    button: {
      borderRadius: border.md,
    },
  });

export function BackButton({ onPress }) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleNavigateBack = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };
  return (
    <IconButton
      onPress={handleNavigateBack}
      style={{ borderRadius: spacing.md }}
      iconColor={colors.onBackground}
      icon={"chevron-left"}
      size={24}
      mode="contained"
      containerColor={colors.surface
        .replace("rgb", "rgba")
        .replace(")", ", 0.8)")}
    />
  );
}
