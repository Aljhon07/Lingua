import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../WelcomeScreen";
import FeaturesScreen from "../FeaturesScreen";
import GetStartedScreen from "../GetStartedScreen";

const Stack = createStackNavigator();

const OnboardingNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Features" component={FeaturesScreen} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigation;
