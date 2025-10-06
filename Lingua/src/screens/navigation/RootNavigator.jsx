import { useAuthContext } from "@context/AuthProvider";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";
import OnboardingNavigation from "../onboarding/navigation/OnboardingNavigation";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetOnboarding } from "../onboarding/utils/onboardingUtils";

export default function RootNavigator() {
  const { loading, isAuthenticated } = useAuthContext();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(null);

  useEffect(() => {
    resetOnboarding();
    checkOnboardingStatus();

    // Listen for onboarding completion
    const interval = setInterval(checkOnboardingStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingCompleted = await AsyncStorage.getItem(
        "onboarding_completed"
      );
      setHasCompletedOnboarding(onboardingCompleted === "true");
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      setHasCompletedOnboarding(false);
    }
  };

  // Show loading while checking onboarding status
  if (hasCompletedOnboarding === null) {
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

  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return <OnboardingNavigation />;
  }

  // Show main app flow based on authentication status
  return isAuthenticated ? <MainNavigation /> : <AuthNavigation />;
}
