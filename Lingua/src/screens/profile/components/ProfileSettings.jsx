import { StyleSheet, Alert, Linking, Platform } from "react-native"
import { useTheme, List, Divider, Switch } from "react-native-paper"
import { Section } from "@components/atoms/Section"
import { useThemeContext } from "@context/ThemeProvider"
import { spacing } from "@constants/globalStyles"
import { useState } from "react"

export default function ProfileSettings({
  onTermsPress,
  onPrivacyPress,
  onAboutPress,
  onHelpPress,
  onContactPress,
}) {
  const { colors } = useTheme()
  const { themePreference, setThemePreference } = useThemeContext()
  const styles = createStyles(colors)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const isDarkTheme = themePreference === "dark"

  const handleThemeToggle = (value) => {
    setThemePreference(value ? "dark" : "light")
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
      `mailto:bugs@lingua-app.com?subject=Bug Report&body=${encodeURIComponent(
        emailBody
      )}`
    )
  }

  return (
    <>
      <Section
        headline="Preferences"
        headlineVariant="titleMedium"
        contentContainerStyle={styles.sectionContent}
        style={styles.section}
      >
        <List.Item
          title="Dark Theme"
          description="Switch between light and dark mode"
          left={(props) => (
            <List.Icon
              {...props}
              icon="theme-light-dark"
              color={colors.primary}
            />
          )}
          right={() => (
            <Switch value={isDarkTheme} onValueChange={handleThemeToggle} />
          )}
          style={styles.listItem}
        />

        <Divider style={styles.divider} />

        <List.Item
          title="Notifications"
          description="Receive push notifications"
          left={(props) => (
            <List.Icon {...props} icon="bell" color={colors.primary} />
          )}
          right={() => (
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          )}
          style={styles.listItem}
        />
      </Section>

      <Section
        headline="Account & Legal"
        headlineVariant="titleMedium"
        contentContainerStyle={styles.sectionContent}
        style={styles.section}
      >
        <List.Item
          title="Terms & Conditions"
          description="Read our terms of service"
          left={(props) => (
            <List.Icon {...props} icon="file-document" color={colors.primary} />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={onTermsPress}
          style={styles.listItem}
        />

        <Divider style={styles.divider} />

        <List.Item
          title="Privacy Policy"
          description="Learn how we protect your data"
          left={(props) => (
            <List.Icon
              {...props}
              icon="shield-account"
              color={colors.primary}
            />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={onPrivacyPress}
          style={styles.listItem}
        />
      </Section>

      <Section
        headline="App Information"
        headlineVariant="titleMedium"
        contentContainerStyle={styles.sectionContent}
        style={styles.section}
      >
        <List.Item
          title="Version"
          description="1.0.0"
          left={(props) => (
            <List.Icon {...props} icon="information" color={colors.primary} />
          )}
          style={styles.listItem}
        />

        <Divider style={styles.divider} />

        <List.Item
          title="About Lingua"
          description="Learn more about our app"
          left={(props) => (
            <List.Icon {...props} icon="help-circle" color={colors.primary} />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={onAboutPress}
          style={styles.listItem}
        />
      </Section>

      <Section
        headline="Help & Support"
        headlineVariant="titleMedium"
        contentContainerStyle={styles.sectionContent}
        style={styles.section}
      >
        <List.Item
          title="FAQ"
          description="Frequently asked questions"
          left={(props) => (
            <List.Icon
              {...props}
              icon="frequently-asked-questions"
              color={colors.primary}
            />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={onHelpPress}
          style={styles.listItem}
        />

        <Divider style={styles.divider} />

        <List.Item
          title="Contact Support"
          description="Reach out to our support team"
          left={(props) => (
            <List.Icon {...props} icon="email-outline" color={colors.primary} />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={onContactPress}
          style={styles.listItem}
        />

        <Divider style={styles.divider} />

        <List.Item
          title="Report a Bug"
          description="Help us improve the app"
          left={(props) => (
            <List.Icon {...props} icon="bug-outline" color={colors.primary} />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={handleReportBug}
          style={styles.listItem}
        />
      </Section>
    </>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    section: {
      marginBottom: spacing.xl,
    },
    sectionContent: {
      padding: 0,
      backgroundColor: "transparent",
    },
    listItem: {
      paddingVertical: spacing.md,
    },
    divider: {
      marginLeft: 56,
      backgroundColor: colors.outlineVariant,
    },
  })
