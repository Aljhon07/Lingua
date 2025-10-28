import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { spacing, border } from '@constants/globalStyles';

const FeatureCard = ({ icon, title, description }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.textContainer}>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      padding: spacing.lg,
      marginVertical: spacing.md,
      borderRadius: border.lg,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    iconContainer: {
      marginRight: spacing.lg,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      color: colors.onSurface,
      marginBottom: spacing.sm,
    },
    description: {
      color: colors.onSurfaceVariant,
      lineHeight: 20,
    },
  });

export default FeatureCard;