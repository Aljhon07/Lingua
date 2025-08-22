import { useQueryState } from "@hooks/useQueryState"
import { fetchProfile } from "@services/directus/rest"
import { useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import DataContainer from "@components/layouts/DataContainer"
import { StyleSheet, ScrollView, Alert } from "react-native"
import { useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { useAuthContext } from "@context/AuthProvider"
import ProfileHeader from "./components/ProfileHeader"
import ProfileSettings from "./components/ProfileSettings"
import ProfileActions from "./components/ProfileActions"

export default function Profile({ navigation }) {
  const { colors } = useTheme()
  const styles = createStyles(colors)
  const { getQueryState, executeQuery } = useQueryState()
  const profile = getQueryState("profile")
  const { signOut } = useAuthContext()

  useEffect(() => {
    executeQuery("profile", fetchProfile)
  }, [])

  const handleTermsPress = () => {
    navigation?.navigate?.("TermsAndConditions", { from: "Profile" })
  }

  const handlePrivacyPress = () => {
    navigation?.navigate?.("PrivacyPolicy", { from: "Profile" })
  }

  const handleAboutPress = () => {
    Alert.alert(
      "About Lingua",
      "Lingua is your comprehensive language learning and travel companion app. Our mission is to break down language barriers and make travel more accessible and enjoyable for everyone.\n\n• Learn languages with interactive lessons\n• Translate text and speech in real-time\n• Book flights and travel packages\n• Access offline content\n• Connect with native speakers\n\nVersion 1.0.0\nDeveloped with ❤️ for language learners worldwide.",
      [{ text: "OK" }]
    )
  }

  const handleHelpPress = () => {
    navigation?.navigate?.("HelpCenter")
  }

  const handleContactPress = () => {
    navigation?.navigate?.("ContactSupport")
  }

  const handleEditPress = () => {
    console.log("Navigate to Edit Profile")
  }

  const handleLogoutPress = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out of your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: signOut,
        },
      ]
    )
  }

  return (
    <SafeAreaView style={styles.screen}>
      <DataContainer
        loading={profile.loading}
        error={profile.error}
        data={profile.data}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ProfileHeader profile={profile.data} onEditPress={handleEditPress} />

          <ProfileSettings
            onTermsPress={handleTermsPress}
            onPrivacyPress={handlePrivacyPress}
            onAboutPress={handleAboutPress}
            onHelpPress={handleHelpPress}
            onContactPress={handleContactPress}
          />

          <ProfileActions onLogoutPress={handleLogoutPress} />
        </ScrollView>
      </DataContainer>
    </SafeAreaView>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: spacing.lg,
      paddingBottom: spacing.xl,
    },
  })
