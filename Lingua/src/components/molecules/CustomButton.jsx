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
  contentStyle,
  props,
  children,
}) {
  const { roundness, colors } = useTheme();
  const styles = createStyles(roundness, colors, primary);
  return (
    <Button
      mode={primary ? "contained" : "outlined"}
      style={[styles.button, style]}
      onPress={onPress}
      loading={loading}
      disabled={loading}
      icon={() => (
        <Icon source={icon} size={iconSize} color={colors.onBackground} />
      )}
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
