import { useQueryState } from "@hooks/useQueryState"
import { fetchProfile } from "@services/directus/rest"
import { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import DataContainer from "@components/layouts/DataContainer"
import { StyleSheet, ScrollView, Alert } from "react-native"
import { useTheme, Snackbar } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { useAuthContext } from "@context/AuthProvider"
import { useProfileContext } from "@context/ProfileProvider"
import ProfileHeader from "./components/ProfileHeader"
import ProfileSettings from "./components/ProfileSettings"
import ProfileActions from "./components/ProfileActions"

export default function Profile({ navigation }) {
  const { colors } = useTheme()
  const styles = createStyles(colors)
  const { getQueryState, executeQuery } = useQueryState()
  const profile = getQueryState("profile")
  const { signOut } = useAuthContext()
  const { updateProfile, getProfile } = useProfileContext()

  const [isEditing, setIsEditing] = useState(false)
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  useEffect(() => {
    executeQuery("profile", fetchProfile)
  }, [])

  const showSnackbar = (message) => {
    setSnackbarMessage(message)
    setSnackbarVisible(true)
  }

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
    setIsEditing(true)
  }

  const handleAvatarPress = () => {
    showSnackbar("📸 Avatar customization coming in future updates!")
  }

  const handleSave = async (updatedData) => {
    try {
      if (!updatedData.first_name?.trim() || !updatedData.last_name?.trim()) {
        showSnackbar("❌ First name and last name are required")
        return
      }

      await updateProfile(updatedData)
      await executeQuery("profile", fetchProfile)
      setIsEditing(false)
      showSnackbar("✅ Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      showSnackbar("❌ Failed to update profile. Please try again.")
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
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
          <ProfileHeader
            profile={profile.data}
            onEditPress={handleEditPress}
            onAvatarPress={handleAvatarPress}
            onSave={handleSave}
            onCancel={handleCancel}
            isEditing={isEditing}
          />

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

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: "Dismiss",
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
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
