import { createStackNavigator } from "@react-navigation/stack"
import PackageDetails from "../PackageDetails"
import BookingNavigation from "src/screens/flight-booking/navigation/BookingNavigation"
import BackButton from "@components/molecules/BackButton"

const Stack = createStackNavigator()

export default function PackageDetailsNavigation({ route }) {
  const { item } = route.params

  return (
    <Stack.Navigator
      initialRouteName="PackageDetails"
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
      }}
    >
      <Stack.Screen
        name="PackageDetails"
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "transparent",
          },

          headerLeft: () => {
            return <BackButton />
          },
          headerTransparent: true,
        }}
        initialParams={{ item }}
        component={PackageDetails}
      />
      <Stack.Screen
        name="BookingNavigation"
        component={BookingNavigation}
        options={{
          animation: "slide_from_right",
          headerShown: false,
          headerTitle: "Booking",
        }}
      />
    </Stack.Navigator>
  )
}
