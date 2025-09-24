import {
  ScrollView,
  StyleSheet,
  Alert,
  Linking,
  Platform,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text, useTheme, List, Card, Button } from "react-native-paper"
import { Section } from "@components/atoms/Section"
import { spacing } from "@constants/globalStyles"

export default function ContactSupport({ navigation }) {
  const { colors } = useTheme()
  const styles = createStyles(colors)

  const handleEmailSupport = () => {
    Linking.openURL("mailto:support@lingua.com?subject=Support Request")
  }

  const handlePhoneSupport = () => {
    Linking.openURL("tel:+1234567890")
  }

  const handleReportBug = () => {
    const emailBody = `
Device Information:
- OS: ${Platform.OS}
- App Version: 1.0.0

Bug Description:
Please describe the bug you encountered...

Steps to Reproduce:
1. 
2. 
3. 

Expected Behavior:
What you expected to happen...

Actual Behavior:
What actually happened...
    `

    Linking.openURL(
      `mailto:bugs@lingua.com?subject=Bug Report&body=${encodeURIComponent(
        emailBody
      )}`
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>
          Contact Support
        </Text>

        <Text variant="bodyMedium" style={styles.description}>
          We're here to help! Choose how you'd like to get in touch with our
          support team.
        </Text>

        <Section
          headline="Get in Touch"
          headlineVariant="titleMedium"
          contentContainerStyle={styles.sectionContent}
          style={styles.section}
        >
          <List.Item
            title="Email Support"
            description="Get help via email - We'll respond within 24 hours"
            left={(props) => (
              <List.Icon {...props} icon="email" color={colors.primary} />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={handleEmailSupport}
            style={styles.listItem}
          />

          <List.Item
            title="Phone Support"
            description="Call us directly for immediate assistance"
            left={(props) => (
              <List.Icon {...props} icon="phone" color={colors.primary} />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={handlePhoneSupport}
            style={styles.listItem}
          />

          <List.Item
            title="Report a Bug"
            description="Help us improve by reporting issues"
            left={(props) => (
              <List.Icon {...props} icon="bug" color={colors.primary} />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={handleReportBug}
            style={styles.listItem}
          />
        </Section>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>
              Support Hours
            </Text>
            <Text variant="bodyMedium" style={styles.cardText}>
              • Email: 24/7 (Response within 24 hours)
            </Text>
            <Text variant="bodyMedium" style={styles.cardText}>
              • Phone: Monday - Friday, 9 AM - 6 PM EST
            </Text>
            <Text variant="bodyMedium" style={styles.cardText}>
              • Emergency: For urgent issues, please call
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>
              Contact Information
            </Text>
            <Text variant="bodyMedium" style={styles.cardText}>
              📧 support@lingua.com
            </Text>
            <Text variant="bodyMedium" style={styles.cardText}>
              📞 +1 (234) 567-8900
            </Text>
            <Text variant="bodyMedium" style={styles.cardText}>
              🐛 bugs@lingua.com
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
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
      marginBottom: spacing.sm,
      color: colors.onBackground,
      fontWeight: "600",
    },
    description: {
      marginBottom: spacing.lg,
      color: colors.onSurfaceVariant,
      lineHeight: 22,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionContent: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      overflow: "hidden",
    },
    listItem: {
      backgroundColor: colors.surface,
      paddingVertical: spacing.sm,
    },
    card: {
      marginBottom: spacing.lg,
      backgroundColor: colors.surface,
      borderRadius: spacing.md,
    },
    cardTitle: {
      marginBottom: spacing.sm,
      color: colors.onSurface,
      fontWeight: "600",
    },
    cardText: {
      marginBottom: spacing.xs,
      color: colors.onSurfaceVariant,
      lineHeight: 20,
    },
  })
