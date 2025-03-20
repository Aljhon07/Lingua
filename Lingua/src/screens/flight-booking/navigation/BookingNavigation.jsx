import BackButton from "@components/molecules/BackButton"
import Booking from "../Booking"
import { createStackNavigator } from "@react-navigation/stack"
import PassengerInfo from "../PassengerInfo"

const Stack = createStackNavigator()

export default function BookingNavigation({ route }) {
  const { travel_package } = route.params

  return (
    <Stack.Navigator initialRouteName="Booking">
      <Stack.Screen
        name="Booking"
        component={Booking}
        initialParams={{ travel_package }}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: "Available Tickets",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "transparent",
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="PassengerInfo"
        component={PassengerInfo}
        options={{
          headerTitle: "Passenger Information",
          headerTitleAlign: "center",
          animation: "slide_from_right",
          headerStyle: {
            backgroundColor: "transparent",
            shadowColor: "transparent",
          },
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  )
}
