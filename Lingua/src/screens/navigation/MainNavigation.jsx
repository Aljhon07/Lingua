import { createStackNavigator } from "@react-navigation/stack"
import { useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"

import MainTab from "./MainTab"
import Translator from "../translator/Translator"
import PackageDetailsNavigation from "../travel-package-listing/navigation/PackageDetailsNavigation"
import BookingDetailsNavigation from "../bookings/navigation/BookingDetailsNavigation"
import LessonNavigation from "../language-learning/navigations/LessonNavigation"
import ProfileNavigation from "../profile/navigation/ProfileNavigation"
import BookingHistory from "../bookings/BookingHistory"
import ItineraryScreen from "../home/ItineraryScreen"

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
      {/* <Stack.Screen
        name="Translator"
        component={Translator}
        options={{
          animation: "reveal_from_bottom",
        }}
      /> */}
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
  )
}
