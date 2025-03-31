import { createStackNavigator } from "@react-navigation/stack"
import { useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import BackButton from "@components/molecules/BackButton"
import BookingDetails from "../BookingDetails"
import Checkout from "../Checkout"
import StripeApp from "../components/StripePay"

const Stack = createStackNavigator()

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
