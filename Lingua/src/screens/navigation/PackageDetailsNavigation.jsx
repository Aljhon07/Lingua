import { createStackNavigator } from "@react-navigation/stack"
import PackageDetails from "../travel-package-listing/PackageDetails"
import { MaterialIcons } from "@expo/vector-icons"
import { useTheme } from "react-native-paper"

const Stack = createStackNavigator()

export default function PackageDetailsNavigation() {
  const { colors, roundness } = useTheme()

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
          headerTitle: "Details",
          headerTitleAlign: "center",
        }}
        component={PackageDetails}
      />
    </Stack.Navigator>
  )
}
