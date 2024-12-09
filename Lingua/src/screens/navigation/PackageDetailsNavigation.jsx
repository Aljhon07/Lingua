import { createStackNavigator } from "@react-navigation/stack"
import PackageDetails from "../travel-package-listing/PackageDetails"
import { useTheme } from "react-native-paper"
import Booking from "../flight-booking/Booking"

const Stack = createStackNavigator()

export default function PackageDetailsNavigation({ route }) {
  const { colors, roundness } = useTheme()
  const { imageURL, item } = route.params
  console.log("navigation", item)
  console.error(item.country.name)
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
        initialParams={{ item, imageURL }}
        component={PackageDetails}
      />
      <Stack.Screen
        name="BookingScreen"
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
