import React, { useEffect } from "react";
import AuthProvider from "@context/AuthProvider.jsx";
import { useFonts } from "expo-font";
import ThemeProvider from "@context/ThemeProvider";
import RootNavigator from "@navigation/RootNavigator";
import ProfileProvider from "@context/ProfileProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LanguageProvider } from "@context/LanguageProvider";
import { PhrasebookProvider } from "@context/PhrasebookProvider";
import LessonProvider from "@context/LessonProvider";
import UserProgressProvider from "@context/UserProgressProvider";
import TravelPackagesProvider from "@context/TravelPackagesProvider";
import { resetOnboarding } from "src/screens/onboarding/utils/onboardingUtils";
import { PerfMonitor } from "@utils/perfMonitor";

// Record app start time immediately

export default function App() {
  const [loaded] = useFonts({
    "Alegreya-Thin": require("@assets/fonts/Alegreya/AlegreyaSans-Thin.ttf"),
    "Alegreya-Regular": require("@assets/fonts/Alegreya/AlegreyaSans-Regular.ttf"),
    "Alegreya-Medium": require("@assets/fonts/Alegreya/AlegreyaSans-Medium.ttf"),
    "Alegreya-Bold": require("@assets/fonts/Alegreya/AlegreyaSans-Bold.ttf"),
    "Exo2-Medium": require("@assets/fonts/exo2/Exo2-Medium.ttf"),
    "Exo2-Bold": require("@assets/fonts/exo2/Exo2-Bold.ttf"),
    "NotoSans-Regular": require("@assets/fonts/noto-sans/NotoSans-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  PerfMonitor.initAppStart();

  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <AuthProvider>
          <LanguageProvider>
            <PhrasebookProvider>
              <UserProgressProvider>
                <TravelPackagesProvider>
                  <ThemeProvider>
                    <RootNavigator />
                  </ThemeProvider>
                </TravelPackagesProvider>
              </UserProgressProvider>
            </PhrasebookProvider>
          </LanguageProvider>
        </AuthProvider>
      </ProfileProvider>
    </SafeAreaProvider>
  );
}
