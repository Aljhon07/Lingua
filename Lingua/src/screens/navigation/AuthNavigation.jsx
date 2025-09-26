import { createStackNavigator } from "@react-navigation/stack"
import Auth from "../auth/Auth.jsx"
import SignIn from "../auth/SignIn.jsx"
import SignUp from "../auth/SignUp.jsx"
import TermsAndConditions from "../auth/TermsAndConditions.jsx"
import PrivacyPolicy from "../auth/PrivacyPolicy.jsx"

const Stack = createStackNavigator()

export default function AuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  )
}
