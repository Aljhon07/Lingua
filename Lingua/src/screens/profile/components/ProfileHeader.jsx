import { useState } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import {
  Text,
  useTheme,
  Avatar,
  TextInput,
  Button,
  IconButton,
} from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { spacing } from "@constants/globalStyles"

export default function ProfileHeader({
  profile,
  onEditPress,
  onAvatarPress,
  onSave,
  onCancel,
  isEditing,
}) {
  const profileImage = require("@assets/images/default_profile.png")
  const { colors } = useTheme()
  const styles = createStyles(colors)

  const [firstName, setFirstName] = useState(profile?.first_name || "")
  const [lastName, setLastName] = useState(profile?.last_name || "")
  const [showEmail, setShowEmail] = useState(false)

  // Update local state when profile changes
  useState(() => {
    if (profile) {
      setFirstName(profile.first_name || "")
      setLastName(profile.last_name || "")
    }
  }, [profile])

  const censorEmail = (email) => {
    if (!email) return ""
    const [username, domain] = email.split("@")
    if (username.length <= 2) return email
    const visibleChars = Math.min(3, username.length)
    const censored =
      username.slice(0, visibleChars) +
      "*".repeat(username.length - visibleChars)
    return `${censored}@${domain}`
  }

  const handleSave = () => {
    onSave({ first_name: firstName, last_name: lastName })
  }

  const handleCancel = () => {
    // Reset to original values
    setFirstName(profile?.first_name || "")
    setLastName(profile?.last_name || "")
    onCancel()
  }

  return (
    <View style={styles.profileHeader}>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={onAvatarPress}
        activeOpacity={0.7}
      >
        <Avatar.Image size={120} source={profileImage} style={styles.avatar} />
        <View style={styles.cameraIconContainer}>
          <MaterialCommunityIcons
            name="camera"
            size={20}
            color={colors.onPrimary}
          />
        </View>
      </TouchableOpacity>

      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            mode="outlined"
            style={styles.input}
            dense
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            mode="outlined"
            style={styles.input}
            dense
          />
          <View style={styles.editButtons}>
            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.saveButton}
              compact
            >
              Save
            </Button>
            <Button
              mode="outlined"
              onPress={handleCancel}
              style={styles.cancelButton}
              compact
            >
              Cancel
            </Button>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.nameContainer}>
            <Text variant="headlineSmall" style={styles.userName}>
              {profile?.first_name} {profile?.last_name}
            </Text>
            <IconButton
              icon="pencil"
              size={20}
              onPress={onEditPress}
              iconColor={colors.primary}
              style={styles.editIcon}
            />
          </View>

          <View style={styles.emailContainer}>
            <Text variant="bodyMedium" style={styles.userEmail}>
              {showEmail ? profile?.email : censorEmail(profile?.email)}
            </Text>
            <IconButton
              icon={showEmail ? "eye-off" : "eye"}
              size={18}
              onPress={() => setShowEmail(!showEmail)}
              iconColor={colors.onSurfaceVariant}
              style={styles.eyeIcon}
            />
          </View>
        </>
      )}
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
    nameContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.xs,
    },
    userName: {
      fontWeight: "600",
      textAlign: "center",
      color: colors.onSurface,
    },
    editIcon: {
      margin: 0,
      marginLeft: spacing.xs,
    },
    emailContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.md,
    },
    userEmail: {
      color: colors.onSurfaceVariant,
      textAlign: "center",
    },
    eyeIcon: {
      margin: 0,
      marginLeft: spacing.xs,
    },
    editContainer: {
      width: "100%",
      paddingHorizontal: spacing.md,
      gap: spacing.sm,
    },
    input: {
      backgroundColor: colors.surface,
    },
    editButtons: {
      flexDirection: "row",
      justifyContent: "center",
      gap: spacing.sm,
      marginTop: spacing.sm,
    },
    saveButton: {
      flex: 1,
    },
    cancelButton: {
      flex: 1,
      borderColor: colors.outline,
    },
  })
