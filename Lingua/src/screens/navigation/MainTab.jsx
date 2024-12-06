import { createStackNavigator } from "@react-navigation/stack"
import VisibleTabs from "./VisibleTabs"
import Translator from "../translator/Translator"
import { useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"

const Stack = createStackNavigator()

export default function MainTab() {
  const { colors } = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="VisibleTabs"
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
      <Stack.Screen name="VisibleTabs" component={VisibleTabs} />
      <Stack.Screen name="Translator" component={Translator} />
    </Stack.Navigator>
  )
}
