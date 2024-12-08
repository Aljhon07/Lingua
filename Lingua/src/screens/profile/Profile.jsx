import { useQueryState } from "@hooks/useQueryState"
import { fetchProfile } from "@services/directus/rest"
import { useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import DataContainer from "@components/layouts/DataContainer"
import { Image, StyleSheet, View } from "react-native"
import { CustomButton } from "@components/molecules/CustomButton"
import { Section } from "@components/atoms/Section"
import { spacing } from "@constants/globalStyles"
import { ThemeSelector } from "@components/molecules/ThemeSelector"
import { useTheme } from "react-native-paper"
import { useAuthContext } from "@context/AuthProvider"

export default function Profile() {
  const { signOut } = useAuthContext()
  const { getQueryState, executeQuery } = useQueryState()
  const { colors } = useTheme()
  const styles = createStyles(colors)
  const profileImage = require("@assets/images/default_profile.png")
  const profile = getQueryState("profile")

  useEffect(() => {
    executeQuery("profile", fetchProfile)
  }, [])

  return (
    <SafeAreaView style={styles.screen}>
      <DataContainer
        loading={profile.loading}
        error={profile.error}
        data={profile.data}
      >
        <View style={styles.profileContainer}>
          <Image source={profileImage} style={styles.profile} />
          <CustomButton primary>Change Profile</CustomButton>
        </View>

        <Section
          headline="Theme"
          headlineVariant="labelLarge"
          contentContainerStyle={{
            flex: 0,
            padding: 0,
            backgroundColor: "transparent",
          }}
          sectionStyle={{ flex: 0 }}
        >
          <ThemeSelector />
        </Section>
        <Section
          headline="Account"
          headlineVariant="labelLarge"
          contentContainerStyle={{ flex: 0, padding: 0 }}
        >
          <CustomButton
            primary
            style={styles.logOutButton}
            textStyle={styles.logOutText}
            onPress={signOut}
          >
            Log Out
          </CustomButton>
        </Section>
      </DataContainer>
    </SafeAreaView>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      gap: spacing.lg,
      paddingHorizontal: spacing.lg,
    },
    profileContainer: {
      flex: 0,
      justifyContent: "center",
      alignItems: "center",
    },

    profile: {
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    logOutButton: {
      backgroundColor: colors.errorContainer,
    },
    logOutText: {
      color: colors.onErrorContainer,
    },
  })
