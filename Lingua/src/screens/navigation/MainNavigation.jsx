import { createStackNavigator } from "@react-navigation/stack"
import { useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"

import MainTab from "./MainTab"
import Translator from "../translator/Translator"
import PackageDetailsNavigation from "./PackageDetailsNavigation"

const Stack = createStackNavigator()

export default function MainNavigation() {
  const { colors } = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      screenOptions={{
        animation: "reveal_from_bottom",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 65,
          paddingTop: spacing.sm,
          borderTopWidth: 0,
        },
      }}
    >
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Translator" component={Translator} />
      <Stack.Screen
        options={{
          animation: "scale_from_center",
        }}
        name="PackageDetailsNavigation"
        component={PackageDetailsNavigation}
      />
    </Stack.Navigator>
  )
}
