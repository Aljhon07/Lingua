import { View, StyleSheet } from "react-native"
import { Text, useTheme, Avatar } from "react-native-paper"
import { CustomButton } from "@components/molecules/CustomButton"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { spacing } from "@constants/globalStyles"

export default function ProfileHeader({ profile, onEditPress }) {
  const profileImage = require("@assets/images/default_profile.png")
  const { colors } = useTheme()
  const styles = createStyles(colors)

  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Avatar.Image size={120} source={profileImage} style={styles.avatar} />
        <View style={styles.cameraIconContainer}>
          <MaterialCommunityIcons
            name="camera"
            size={20}
            color={colors.onPrimary}
          />
        </View>
      </View>

      <Text variant="headlineSmall" style={styles.userName}>
        {profile?.first_name} {profile?.last_name}
      </Text>

      <Text variant="bodyMedium" style={styles.userEmail}>
        {profile?.email}
      </Text>

      <CustomButton
        mode="outlined"
        style={styles.editProfileButton}
        textColor={colors.primary}
        iconColor={colors.primary}
        icon="pencil"
        onPress={onEditPress}
      >
        Edit Profile
      </CustomButton>
    </View>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    profileHeader: {
      alignItems: "center",
      paddingVertical: spacing.xl,
      marginBottom: spacing.xl,
    },
    avatarContainer: {
      position: "relative",
      marginBottom: spacing.md,
    },
    avatar: {
      backgroundColor: colors.surfaceVariant,
    },
    cameraIconContainer: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: colors.primary,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderColor: colors.background,
    },
    userName: {
      fontWeight: "600",
      textAlign: "center",
      color: colors.onSurface,
      marginBottom: spacing.xs,
    },
    userEmail: {
      color: colors.onSurfaceVariant,
      textAlign: "center",
      marginBottom: spacing.md,
    },
    editProfileButton: {
      marginTop: spacing.sm,
      minWidth: 140,
      borderColor: colors.primary,
    },
  })
