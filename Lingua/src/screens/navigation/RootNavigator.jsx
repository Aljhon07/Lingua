import { useAuthContext } from "@context/AuthProvider";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";

export default function RootNavigator() {
  const { loading, isAuthenticated } = useAuthContext();

  // Show main app flow based on authentication status
  return isAuthenticated ? <MainNavigation /> : <AuthNavigation />;
}
