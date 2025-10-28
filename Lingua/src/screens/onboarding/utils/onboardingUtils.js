import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Utility functions for managing onboarding state
 */

export const completeOnboarding = async () => {
  try {
    await AsyncStorage.setItem("onboarding_completed", "true");
    return true;
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return false;
  }
};

export const resetOnboarding = async () => {
  try {
    await AsyncStorage.removeItem("onboarding_completed");
    return true;
  } catch (error) {
    console.error("Error resetting onboarding:", error);
    return false;
  }
};

export const checkOnboardingStatus = async () => {
  try {
    const status = await AsyncStorage.getItem("onboarding_completed");
    return status === "true";
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return false;
  }
};
