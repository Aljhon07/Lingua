import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { spacing } from "@constants/globalStyles";
import MainTab from "./MainTab";
import Translator from "../translator/Translator";
import PackageDetailsNavigation from "../travel-package-listing/navigation/PackageDetailsNavigation";
import BookingDetailsNavigation from "../bookings/navigation/BookingDetailsNavigation";
import LessonNavigation from "../language-learning/navigations/LessonNavigation";
import ProfileNavigation from "../profile/navigation/ProfileNavigation";
import BookingHistory from "../bookings/BookingHistory";
import ItineraryScreen from "../home/ItineraryScreen";
import { OnboardingNavigation } from "../onboarding";
import React, { useEffect } from "react";
import { fetchProfile } from "@services/directus/rest";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();

export default function MainNavigation() {
  const { colors } = useTheme();
  const [isOnboardingCompleted, setIsOnboardingCompleted] =
    React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    getOnboardingStatus();
  }, []);

  const getOnboardingStatus = async () => {
    setIsLoading(true);
    try {
      const status = await fetchProfile("fields=onboarding_completed");
      console.log("Onboarding status:", status.onboarding_completed);
      setIsOnboardingCompleted(status?.onboarding_completed === true);
    } catch (error) {
      console.error("Error fetching onboarding status:", error);
      setIsOnboardingCompleted(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  return (
    <Stack.Navigator
      initialRouteName={isOnboardingCompleted ? "MainTab" : "Onboarding"}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          animation: "none",
          backgroundColor: colors.primary,
          height: 65,
          paddingTop: spacing.sm,
          borderTopWidth: 0,
        },
      }}
    >
      <Stack.Screen name="MainTab" component={MainTab} />
      {/* <Stack.Screen
        name="Translator"
        component={Translator}
        options={{
          animation: "reveal_from_bottom",
        }}
      /> */}
      <Stack.Screen name="Onboarding" component={OnboardingNavigation} />
      <Stack.Screen
        options={{
          animation: "scale_from_center",
        }}
        name="PackageDetailsNavigation"
        component={PackageDetailsNavigation}
      />
      <Stack.Screen
        name="BookingDetailsNavigation"
        component={BookingDetailsNavigation}
      />
      <Stack.Screen
        name="LessonVocabs"
        component={LessonNavigation}
        options={{
          animation: "scale_from_center",
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Bookings"
        component={BookingHistory}
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="ItineraryScreen"
        component={ItineraryScreen}
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
}
