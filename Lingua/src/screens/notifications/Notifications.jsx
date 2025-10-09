import React from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import { Text, Button, useTheme, Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "@constants/globalStyles";
import { useNotificationHistory } from "@context/NotificationHistoryProvider";
import NotificationCard from "./components/NotificationCard";
import DataContainer from "@components/layouts/DataContainer";
import PaddedView from "@components/atoms/PaddedView";

export default function Notifications({ navigation }) {
  const { colors } = useTheme();
  const {
    notifications,
    unreadCount,
    notificationsState,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
  } = useNotificationHistory();

  const styles = createStyles(colors);

  const handleNotificationPress = async (notification) => {
    // Mark as read if unread
    if (!notification.seen) {
      await markAsRead(notification.id);
    }

    // If notification has booking info, navigate to booking details
    if (notification.booking) {
      navigation.navigate("BookingDetailsNavigation", {
        screen: "BookingDetails",
        params: { bookingId: notification.booking },
      });
    }
  };

  const handleMarkAllAsRead = async () => {
    const success = await markAllAsRead();
    if (success) {
      console.log("All notifications marked as read");
    }
  };

  const renderNotificationItem = ({ item, index }) => (
    <NotificationCard
      notification={item}
      onPress={handleNotificationPress}
      isLast={index === notifications.length - 1}
    />
  );

  const renderEmptyState = () => (
    <PaddedView style={styles.emptyContainer}>
      <Text variant="headlineSmall" style={styles.emptyTitle}>
        No notifications yet
      </Text>
      <Text variant="bodyLarge" style={styles.emptyMessage}>
        You'll receive notifications about your bookings and app updates here.
      </Text>
    </PaddedView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Notifications" titleStyle={styles.headerTitle} />
        {unreadCount > 0 && (
          <Appbar.Action
            icon="check-all"
            onPress={handleMarkAllAsRead}
            iconColor={colors.primary}
          />
        )}
      </Appbar.Header>

      <DataContainer
        data={notifications}
        loading={notificationsState.loading}
        error={notificationsState.error}
        errorMessage="Failed to load notifications"
        noDataComponent={renderEmptyState}
      >
        <View style={styles.content}>
          {unreadCount > 0 && (
            <PaddedView style={styles.headerSection}>
              <View style={styles.unreadBadge}>
                <Text variant="bodyMedium" style={styles.unreadText}>
                  {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
                </Text>
                <Button
                  mode="text"
                  onPress={handleMarkAllAsRead}
                  compact
                  textColor={colors.primary}
                  style={styles.markAllButton}
                >
                  Mark all as read
                </Button>
              </View>
            </PaddedView>
          )}

          <View style={styles.listWrapper}>
            <FlatList
              data={notifications}
              renderItem={renderNotificationItem}
              keyExtractor={(item) => item.id.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={notificationsState.loading}
                  onRefresh={refreshNotifications}
                  colors={[colors.primary]}
                />
              }
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </View>
      </DataContainer>
    </SafeAreaView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTitle: {
      color: colors.primary,
      fontWeight: "600",
    },
    content: {
      flex: 1,
    },
    headerSection: {
      paddingVertical: spacing.md,
      backgroundColor: colors.surface,
    },
    unreadBadge: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.primaryContainer,
      borderRadius: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    unreadText: {
      color: colors.onPrimaryContainer,
      fontWeight: "500",
    },
    markAllButton: {
      margin: 0,
    },
    listWrapper: {
      flex: 1,
      backgroundColor: colors.surface,
      marginTop: spacing.sm,
      borderTopLeftRadius: spacing.lg,
      borderTopRightRadius: spacing.lg,
      overflow: "hidden",
    },
    listContainer: {
      flexGrow: 1,
      paddingBottom: spacing.xl,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyTitle: {
      textAlign: "center",
      marginBottom: spacing.md,
      color: colors.primary,
      fontWeight: "600",
    },
    emptyMessage: {
      textAlign: "center",
      color: colors.onSurfaceVariant,
      lineHeight: 24,
      paddingHorizontal: spacing.lg,
    },
  });
