import { createStackNavigator } from "@react-navigation/stack"
import PackageDetails from "../travel-package-listing/PackageDetails"
import Booking from "../flight-booking/Booking"

const Stack = createStackNavigator()

export default function PackageDetailsNavigation({ route }) {
  const { item } = route.params

  return (
    <Stack.Navigator
      initialRouteName="PackageDetails"
      screenOptions={{
        headerShown: false,
        headerTransparent: false,
      }}
    >
      <Stack.Screen
        name="PackageDetails"
        options={{
          headerShown: true,
          headerTitle: `Travel to ${item.country.name}`,
          headerTitleAlign: "center",
        }}
        initialParams={{ item }}
        component={PackageDetails}
      />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{
          animation: "slide_from_right",
          headerShown: true,
          headerTitle: "Booking",
        }}
      />
    </Stack.Navigator>
  )
}
