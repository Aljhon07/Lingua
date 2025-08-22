import { createStackNavigator } from "@react-navigation/stack"
import { useTheme } from "react-native-paper"
import Profile from "./Profile"
import TermsAndConditions from "../auth/TermsAndConditions"
import PrivacyPolicy from "../auth/PrivacyPolicy"

const Stack = createStackNavigator()

export default function ProfileNavigation() {
  const { colors } = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="ProfileMain"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.onSurface,
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Stack.Screen
        name="ProfileMain"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{
          title: "Terms & Conditions",
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          title: "Privacy Policy",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}
