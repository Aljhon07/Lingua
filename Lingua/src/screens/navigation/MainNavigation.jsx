import { createStackNavigator } from "@react-navigation/stack"
import { useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"

import MainTab from "./MainTab"
import Translator from "../translator/Translator"
import PackageDetailsNavigation from "../travel-package-listing/navigation/PackageDetailsNavigation"
import BookingDetails from "../booking-history/BookingDetails"
import BackButton from "@components/molecules/BackButton"

const Stack = createStackNavigator()

export default function MainNavigation() {
  const { colors } = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="MainTab"
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
      <Stack.Screen
        name="Translator"
        component={Translator}
        options={{
          animation: "reveal_from_bottom",
        }}
      />
      <Stack.Screen
        options={{
          animation: "scale_from_center",
        }}
        name="PackageDetailsNavigation"
        component={PackageDetailsNavigation}
      />
      <Stack.Screen
        options={{
          animation: "scale_from_center",
          headerShown: true,
          headerTitle: "Booking Detais",
          headerStyle: {
            backgroundColor: "transparent",
            shadowColor: "transparent",
          },
          headerTitleAlign: "center",

          headerLeft: () => <BackButton />,
        }}
        name="BookingDetails"
        component={BookingDetails}
      />
    </Stack.Navigator>
  )
}
