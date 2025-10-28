import { ScrollView, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text, useTheme, List, Divider, Searchbar } from "react-native-paper"
import { Section } from "@components/atoms/Section"
import { spacing } from "@constants/globalStyles"
import { useState } from "react"

export default function HelpCenter({ navigation }) {
  const { colors } = useTheme()
  const styles = createStyles(colors)
  const [searchQuery, setSearchQuery] = useState("")

  const handleFAQPress = () => {
    navigation.navigate("FAQ")
  }

  const handleContactPress = () => {
    console.log("Contact Support")
  }

  const handleTutorialPress = () => {
    console.log("Tutorial Videos")
  }

  const handleTroubleshootingPress = () => {
    console.log("Troubleshooting Guide")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>
          How can we help you?
        </Text>

        <Searchbar
          placeholder="Search for help..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        <Section
          headline="Popular Topics"
          headlineVariant="titleMedium"
          contentContainerStyle={styles.sectionContent}
          style={styles.section}
        >
          <List.Item
            title="Frequently Asked Questions"
            description="Common questions and answers"
            left={(props) => (
              <List.Icon {...props} icon="help-circle" color={colors.primary} />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={handleFAQPress}
            style={styles.listItem}
          />

          <Divider style={styles.divider} />

          <List.Item
            title="Getting Started"
            description="Learn how to use Lingua"
            left={(props) => (
              <List.Icon {...props} icon="play-circle" color={colors.primary} />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={handleTutorialPress}
            style={styles.listItem}
          />

          <Divider style={styles.divider} />

          <List.Item
            title="Troubleshooting"
            description="Fix common issues"
            left={(props) => (
              <List.Icon {...props} icon="wrench" color={colors.primary} />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={handleTroubleshootingPress}
            style={styles.listItem}
          />
        </Section>

        <Section
          headline="Contact Support"
          headlineVariant="titleMedium"
          contentContainerStyle={styles.sectionContent}
          style={styles.section}
        >
          <List.Item
            title="Email Support"
            description="support@lingua.app"
            left={(props) => (
              <List.Icon {...props} icon="email" color={colors.primary} />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={handleContactPress}
            style={styles.listItem}
          />

          <Divider style={styles.divider} />

          <List.Item
            title="Live Chat"
            description="Chat with our support team"
            left={(props) => (
              <List.Icon {...props} icon="chat" color={colors.primary} />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Live Chat")}
            style={styles.listItem}
          />

          <Divider style={styles.divider} />

          <List.Item
            title="Report a Bug"
            description="Help us improve the app"
            left={(props) => (
              <List.Icon {...props} icon="bug" color={colors.primary} />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Report Bug")}
            style={styles.listItem}
          />
        </Section>
      </ScrollView>
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
    },
    title: {
      textAlign: "center",
      marginBottom: spacing.lg,
      color: colors.onBackground,
    },
    searchBar: {
      marginBottom: spacing.xl,
    },
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
