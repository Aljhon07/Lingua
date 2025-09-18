import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { IconButton, useTheme, Text } from "react-native-paper";
import { spacing } from "@constants/globalStyles";
import { LanguageList } from "@components/atoms/LanguageList";
const TranslationBox = ({
  value,
  onChangeText,
  onSpeech,
  isSource = true,
  isRecording = false,
  placeholder = "",
  editable = true,
  showClear = false,
  onClear,
  sourceLanguage,
  targetLanguage,
  onLanguageChange,
  languages = [],
  label = "",
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors, spacing, editable);

  const containerStyle = [
    styles.container,
    { borderColor: colors.outline },
    !editable && styles.disabledContainer,
  ];

  const inputStyle = [
    styles.input,
    { color: colors.onSurface },
    !editable && styles.disabledInput,
  ];

  const footerStyle = [
    styles.footer,
    { borderTopColor: colors.outline },
  ];

  return (
    <>
      <LanguageList
        label={label}
        hideMenuHeader={false}
        useGlobalContext={false}
        callbackFn={onLanguageChange}
        lang={isSource ? sourceLanguage : ""}
      />
      <View style={containerStyle}>
        <TextInput
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.onSurfaceDisabled}
          multiline
          editable={editable}
          textAlignVertical="top"
        />

        <View style={footerStyle}>
          {editable && showClear && value ? (
            <IconButton
              icon="close"
              size={20}
              onPress={onClear}
              style={styles.actionButton}
              iconColor={colors.onSurface}
            />
          ) : (
            <View style={styles.actionButton} />
          )}

          {onSpeech && (
            <IconButton
              icon={isRecording ? "stop" : (isSource ? "microphone" : "volume-high")}
              size={20}
              onPress={onSpeech}
              style={styles.actionButton}
              disabled={!editable && !value}
              iconColor={isRecording ? colors.error : colors.onSurface}
            />
          )}
        </View>
      </View>
    </>
  );
};

const createStyles = (colors, spacing, editable) => {
  return StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderRadius: 12,
      overflow: "hidden",
      marginBottom: spacing.md,
      minHeight: 200,
    },
    disabledContainer: {
      opacity: 0.9,
    },
    input: {
      flex: 1,
      padding: spacing.md,
      fontSize: 16,
      textAlignVertical: "top",
      backgroundColor: "transparent",
    },
    disabledInput: {
      color: colors.onSurfaceVariant,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: spacing.xs,
      borderTopWidth: 1,
      backgroundColor: "transparent",
    },
    actionButton: {
      margin: 0,
      width: 40,
      height: 40,
      paddingHorizontal: spacing.xs,
    },
  });
};

export default TranslationBox;
