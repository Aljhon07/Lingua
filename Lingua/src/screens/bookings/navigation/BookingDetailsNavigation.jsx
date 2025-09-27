import { createStackNavigator } from "@react-navigation/stack"
import { useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import BackButton from "@components/molecules/BackButton"
import BookingDetails from "../BookingDetails"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import CustomizeItinerary from "../CustomizeItinerary"

const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()

export default function BookingDetailsNavigation() {
  const { colors } = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="BookingDetails"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "transparent",
          shadowColor: "transparent",
        },
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 65,
          paddingTop: spacing.sm,
          borderTopWidth: 0,
        },
      }}
    >
      <Stack.Screen
        options={{
          animation: "scale_from_center",
          headerTitle: "Booking Details",
          headerLeft: () => <BackButton />,
        }}
        name="BookingDetails"
        component={BookingDetails}
      />
      <Stack.Screen
        options={{
          animation: "slide_from_right",
          headerTitle: "Customize Itinerary",
          headerLeft: () => <BackButton />,
        }}
        name="CustomizeItinerary"
        component={CustomizeItinerary}
      />
      {/* <Stack.Screen
        options={{
          animation: "scale_from_center",
          headerTitle: "Checkout",
          headerLeft: () => <BackButton />,
        }}
        name="Checkout"
        component={StripeApp}
      /> */}
    </Stack.Navigator>
  )
}
