import { ScrollView, StyleSheet, View } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { spacing } from "@constants/globalStyles"
import { CustomButton } from "@components/molecules/CustomButton"

export default function LegalDocument({
  title,
  sections,
  lastUpdated,
  showBackButton = true,
  backButtonText = "Back",
  onBack,
  navigation,
}) {
  const { colors } = useTheme()
  const styles = createStyles(colors)

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else if (navigation) {
      navigation.goBack()
    }
  }

  // Don't show back button if we have navigation (header will handle it)
  const shouldShowButton = showBackButton && !navigation

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          {title}
        </Text>

        {sections.map((section, index) => (
          <View key={index}>
            {section.title && (
              <Text variant="titleMedium" style={styles.sectionTitle}>
                {section.title}
              </Text>
            )}
            <Text variant="bodyMedium" style={styles.paragraph}>
              {section.content}
            </Text>
          </View>
        ))}

        {lastUpdated && (
          <Text variant="bodySmall" style={styles.lastUpdated}>
            Last updated: {lastUpdated}
          </Text>
        )}
      </ScrollView>

      {shouldShowButton && (
        <View style={styles.footer}>
          <CustomButton primary onPress={handleBack} style={styles.backButton}>
            {backButtonText}
          </CustomButton>
        </View>
      )}
    </SafeAreaView>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: spacing.lg,
      paddingBottom: spacing.xl,
    },
    title: {
      textAlign: "center",
      marginBottom: spacing.lg,
      color: colors.onBackground,
    },
    sectionTitle: {
      marginTop: spacing.lg,
      marginBottom: spacing.sm,
      color: colors.onBackground,
      fontWeight: "600",
    },
    paragraph: {
      marginBottom: spacing.md,
      lineHeight: 22,
      color: colors.onBackground,
    },
    lastUpdated: {
      marginTop: spacing.lg,
      textAlign: "center",
      fontStyle: "italic",
      color: colors.onSurfaceVariant,
    },
    footer: {
      padding: spacing.lg,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.outline,
    },
    backButton: {
      width: "100%",
    },
  })
