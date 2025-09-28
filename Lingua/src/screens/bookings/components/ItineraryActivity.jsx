import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Text, useTheme, Divider, Icon } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { Pressable, TextInput } from "react-native-gesture-handler"
import { useCustomItinerary } from "@context/CustomItineraryProvider"

function ItineraryActivity({
  activity,
  drag,
  isActive,
  isEditing,
  removeActivity,
  handleActivityChange,
}) {
  const { colors, roundness } = useTheme()
  const { changes, handleChanges } = useCustomItinerary()
  const styles = createStyles(colors, roundness, isActive)
  const [textEditing, setTextEditing] = React.useState(false)
  const [name, setName] = React.useState(activity.name)

  const handleBlur = () => {
    setTextEditing(false)
    if (name !== activity.name) {
      handleActivityChange?.({ ...activity, name }) // send updated activity to parent
    }
  }

  const handleRemove = () => {
    // Pass the entire activity object to handle both saved (id) and unsaved (tempId) items
    removeActivity(activity)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isEditing ? (
          textEditing ? (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleRemove}
            >
              <Icon source={"delete"} size={24} style={styles.deleteIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.dragHandle} onPressIn={drag}>
              <Icon source={"drag"} size={24} style={styles.dragIcon} />
            </TouchableOpacity>
          )
        ) : null}
        <Pressable
          style={styles.activityContent}
          onPress={isEditing ? () => setTextEditing(true) : null}
        >
          {textEditing ? (
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              onBlur={handleBlur}
              style={styles.textInput}
            />
          ) : (
            <Text variant="bodyLarge" style={styles.activityName}>
              {activity.name}
            </Text>
          )}
          {activity.description && (
            <Text variant="bodyMedium" style={styles.activityDescription}>
              {activity.description}
            </Text>
          )}
        </Pressable>
      </View>
      <Divider style={styles.divider} />
    </View>
  )
}

const createStyles = (colors, roundness, isActive) =>
  StyleSheet.create({
    container: {
      backgroundColor: isActive
        ? colors.primaryContainer.replace("rgb", "rgba").replace(")", ", 0.1)")
        : "transparent",
      borderRadius: isActive ? spacing.sm : 0,
      marginVertical: spacing.sm,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.md,
    },
    dragHandle: {
      marginRight: spacing.lg,
      padding: spacing.md,
      borderRadius: spacing.sm,
      backgroundColor: colors.surfaceVariant,
      justifyContent: "center",
      alignItems: "center",
      minWidth: 32,
      minHeight: 32,
    },
    dragIcon: {
      color: colors.onSurfaceVariant,
    },
    activityContent: {
      flex: 1,
      gap: spacing.sm,
    },
    textInput: {
      fontSize: 16,
      color: colors.primary,
    },
    activityName: {
      color: isActive ? colors.primary : colors.onSurface,
    },
    activityDescription: {
      color: colors.onSurfaceVariant,
    },
    divider: {
      backgroundColor: colors.outlineVariant,
    },
    deleteIcon: {
      color: colors.onError,
    },
    deleteButton: {
      marginRight: spacing.lg,
      padding: spacing.md,
      borderRadius: spacing.sm,
      backgroundColor: colors.error,
      justifyContent: "center",
      alignItems: "center",
      minWidth: 32,
      minHeight: 32,
    },
  })

export default ItineraryActivity
