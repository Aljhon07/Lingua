import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text, useTheme, Divider } from "react-native-paper";
import { spacing } from "@constants/globalStyles";

const formatTimeAgo = (dateString) => {
  const now = new Date();
  const notificationDate = new Date(dateString);
  const diffInMs = now - notificationDate;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else {
    return notificationDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};

export default function NotificationCard({
  notification,
  onPress,
  isLast = false,
}) {
  const { colors } = useTheme();
  const styles = createStyles(colors, notification.seen);

  return (
    <>
      <TouchableOpacity
        onPress={() => onPress(notification)}
        activeOpacity={0.7}
      >
        <View style={styles.container}>
          <View style={styles.contentArea}>
            <View style={styles.leftSection}>
              {!notification.seen && <View style={styles.unreadDot} />}
              <View style={styles.textContent}>
                <View style={styles.header}>
                  <Text
                    variant="titleSmall"
                    style={styles.title}
                    numberOfLines={1}
                  >
                    {notification.title} #{notification.booking}
                  </Text>
                  <Text variant="bodySmall" style={styles.timestamp}>
                    {formatTimeAgo(notification.date_created)}
                  </Text>
                </View>

                <Text
                  variant="bodyMedium"
                  style={styles.message}
                  numberOfLines={3}
                >
                  {notification.message}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {!isLast && <Divider style={styles.separator} />}
    </>
  );
}

const createStyles = (colors, isSeen) =>
  StyleSheet.create({
    container: {
      backgroundColor: isSeen ? colors.surface : colors.surfaceVariant,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      minHeight: 88,
    },
    contentArea: {
      flex: 1,
    },
    leftSection: {
      flexDirection: "row",
      alignItems: "flex-start",
      flex: 1,
      gap: spacing.md,
    },
    unreadDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
      marginTop: spacing.xs,
    },
    textContent: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: spacing.sm,
    },
    title: {
      flex: 1,
      marginRight: spacing.md,
      fontWeight: isSeen ? "normal" : "600",
      color: colors.onSurface,
      fontSize: 16,
    },
    timestamp: {
      color: colors.onSurfaceVariant,
      fontSize: 13,
      opacity: 0.8,
    },
    message: {
      color: colors.onSurfaceVariant,
      lineHeight: 22,
      fontSize: 15,
    },
    separator: {
      marginHorizontal: spacing.lg,
      backgroundColor: colors.outline,
      height: 1,
      opacity: 0.8,
    },
  });
