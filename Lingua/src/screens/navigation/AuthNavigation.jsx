import { createStackNavigator } from "@react-navigation/stack"
import Auth from "../auth/Auth.jsx"
import SignIn from "../auth/SignIn.jsx"
import SignUp from "../auth/SignUp.jsx"
import { Appbar } from "react-native-paper"

const Stack = createStackNavigator()

export default function AuthNavigation() {
  return (
    <Stack.Navigator initialRouteName="Auth" screenOptions={{}}>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          title: "Sign In",
          headerLeft: () => null,
          headerTitleAlign: "center",
        }}
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
        options={{
          title: "Sign Up",
          headerLeft: () => null,
          headerTitleAlign: "center",
        }}
        name="SignUp"
        component={SignUp}
      />
    </Stack.Navigator>
  )
}
