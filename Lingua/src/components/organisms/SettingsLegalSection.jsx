import { View, StyleSheet } from "react-native"
import { List, useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"

export function SettingsLegalSection({
  navigation,
  onNavigateToTerms,
  onNavigateToPrivacy,
}) {
  const { colors } = useTheme()

  const handleTermsPress = () => {
    if (onNavigateToTerms) {
      onNavigateToTerms()
    } else if (navigation) {
      navigation.navigate("TermsAndConditions", { from: "Settings" })
    }
  }

  const handlePrivacyPress = () => {
    if (onNavigateToPrivacy) {
      onNavigateToPrivacy()
    } else if (navigation) {
      navigation.navigate("PrivacyPolicy", { from: "Settings" })
    }
  }

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Legal</List.Subheader>
        <List.Item
          title="Terms and Conditions"
          description="View our terms of service"
          left={(props) => (
            <List.Icon {...props} icon="file-document-outline" />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={handleTermsPress}
        />
        <List.Item
          title="Privacy Policy"
          description="View our privacy policy"
          left={(props) => (
            <List.Icon {...props} icon="shield-account-outline" />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={handlePrivacyPress}
        />
      </List.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
})
