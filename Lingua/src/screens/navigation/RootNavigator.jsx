import { useAuthContext } from "@context/AuthProvider";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";
import { NotificationProvider } from "@context/NotificationsProvider";
import { NotificationHistoryProvider } from "@context/NotificationHistoryProvider";

export default function RootNavigator() {
  const { loading, isAuthenticated } = useAuthContext();

  // Show main app flow based on authentication status
  return isAuthenticated ? (
    <NotificationProvider>
      <NotificationHistoryProvider>
        <MainNavigation />
      </NotificationHistoryProvider>
    </NotificationProvider>
  ) : (
    <AuthNavigation />
  );
}
