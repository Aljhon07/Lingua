import BackButton from "@components/molecules/BackButton"
import Booking from "../Booking"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

export default function BookingNavigation({ route }) {
  const { travel_package } = route.params
  console.log(travel_package)

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
    </Stack.Navigator>
  )
}
