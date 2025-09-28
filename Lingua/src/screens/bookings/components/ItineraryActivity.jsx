import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Text, useTheme, Divider, Icon } from "react-native-paper"
import { spacing } from "@constants/globalStyles"

function ItineraryActivity({ activity, drag, isActive, isEditing }) {
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness, isActive)

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isEditing && (
          <TouchableOpacity style={styles.dragHandle} onPressIn={drag}>
            <Icon source={"drag"} size={24} style={styles.dragIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.activityContent}>
          <Text variant="bodyLarge" style={styles.activityName}>
            {activity.name}
          </Text>
          {activity.description && (
            <Text variant="bodyMedium" style={styles.activityDescription}>
              {activity.description}
            </Text>
          )}
        </View>
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
    activityName: {
      color: isActive ? colors.primary : colors.onSurface,
    },
    activityDescription: {
      color: colors.onSurfaceVariant,
    },
    divider: {
      backgroundColor: colors.outlineVariant,
    },
  })

export default ItineraryActivity
