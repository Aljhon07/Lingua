import BackButton from "@components/molecules/BackButton"
import Booking from "../Booking"
import { createStackNavigator } from "@react-navigation/stack"
import PassengerInfo from "../PassengerInfo"
import Summary from "../Summary"
import PassengerInfoProvider from "@context/PassengerInfoProvider"

const Stack = createStackNavigator()

export default function BookingNavigation({ route }) {
  const { travel_package } = route.params

  return (
    <PassengerInfoProvider>
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
        <Stack.Screen
          name="Summary"
          component={Summary}
          options={{
            headerTitle: "Summary",
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
    </PassengerInfoProvider>
  )
}
