import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchUserNotifications,
  patchNotificationSeen,
  markAllNotificationsAsRead,
} from "@services/directus/rest";
import { useQueryState } from "@hooks/useQueryState";
import { useNotification } from "@context/NotificationsProvider";

const NotificationHistoryContext = createContext();

export const useNotificationHistory = () => {
  const context = useContext(NotificationHistoryContext);
  if (!context) {
    throw new Error(
      "useNotificationHistory must be used within a NotificationHistoryProvider"
    );
  }
  return context;
};

export const NotificationHistoryProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { executeQuery, getQueryState } = useQueryState();
  const { notification: newNotification } = useNotification();
  const notificationsState = getQueryState("notifications");

  // Fetch notifications
  const fetchNotifications = async (filter = "") => {
    try {
      // Add user filter to only fetch current user's notifications
      const userFilter = "filter[user][_eq]=$CURRENT_USER";
      const combinedFilter = filter ? `${userFilter}&${filter}` : userFilter;
      executeQuery("notifications", fetchUserNotifications, combinedFilter);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Update local state when query state changes
  useEffect(() => {
    if (notificationsState.data) {
      setNotifications(notificationsState.data);
      const unread = notificationsState.data.filter((n) => !n.seen).length;
      setUnreadCount(unread);
    }
  }, [notificationsState.data]);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await patchNotificationSeen(notificationId);

      // Update local state optimistically
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, seen: true }
            : notification
        )
      );

      // Update unread count
      setUnreadCount((prev) => Math.max(0, prev - 1));

      return true;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      return false;
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();

      // Update local state optimistically
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, seen: true }))
      );
      setUnreadCount(0);

      return true;
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      return false;
    }
  };

  // Auto-fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Listen for new notifications and refresh the list
  useEffect(() => {
    if (newNotification) {
      console.log("New notification received, refreshing list...");
      // Small delay to ensure the notification is saved to database
      setTimeout(() => {
        fetchNotifications();
      }, 1000);
    }
  }, [newNotification]);

  // Refresh notifications every 30 seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const value = {
    notifications,
    unreadCount,
    notificationsState,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    refreshNotifications: () => fetchNotifications(),
  };

  return (
    <NotificationHistoryContext.Provider value={value}>
      {children}
    </NotificationHistoryContext.Provider>
  );
};
