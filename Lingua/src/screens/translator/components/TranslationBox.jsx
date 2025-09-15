import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { IconButton, useTheme, Text } from 'react-native-paper';
import { spacing } from '@constants/globalStyles';
import { LanguageList } from '@components/atoms/LanguageList';

const TranslationBox = ({
  value,
  onChangeText,
  onSpeech,
  isSource = true,
  placeholder = '',
  editable = true,
  showClear = false,
  onClear,
  sourceLanguage,
  targetLanguage,
  onLanguageChange,
  languages = [],
  label = ''
}) => {
  const { colors } = useTheme();
  
  const containerStyle = [
    styles.container,
    { 
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.outline,
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: spacing.md,
      elevation: 2,
      minHeight: 200,
    },
    !editable && { opacity: 0.9 }
  ];
  
  const inputBackground = 'transparent';
  
  const inputStyle = [
    {
      flex: 1,
      padding: spacing.md,
      fontSize: 16,
      textAlignVertical: 'top',
      backgroundColor: inputBackground,
      color: colors.onSurface,
    },
    !editable && { color: colors.onSurfaceVariant }
  ];
  
  const headerStyle = {
    flexDirection: 'row',
    padding: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
    backgroundColor: inputBackground,
  };

  const footerStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
    backgroundColor: inputBackground,
  };


  return (
      <>
        <LanguageList 
          label={label}
          hideMenuHeader={false}
          useGlobalContext={false}
          callbackFn={onLanguageChange}
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
            icon={isSource ? "microphone" : "volume-high"}
            size={20}
            onPress={onSpeech}
            style={styles.actionButton}
            disabled={!editable && !value}
            iconColor={colors.onSurface}
          />
        )}
      </View>
    </View></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  languageLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: spacing.sm,
  },
  actionButton: {
    margin: 0,
    width: 40,
    height: 40,
  
    paddingHorizontal: spacing.xs,
  },
});

export default TranslationBox;
