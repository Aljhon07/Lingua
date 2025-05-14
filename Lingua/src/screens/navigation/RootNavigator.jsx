import { useAuthContext } from "@context/AuthProvider";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootNavigator() {
  const { loading, isAuthenticated } = useAuthContext();
  useEffect(() => {
    if (loading) {
      SplashScreen.preventAutoHideAsync();
    } else {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 100);
    }
  }, [loading]);

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return isAuthenticated ? <MainNavigation /> : <AuthNavigation />;
}
