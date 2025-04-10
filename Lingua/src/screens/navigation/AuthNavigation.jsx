import { createStackNavigator } from "@react-navigation/stack"
import Auth from "../auth/Auth.jsx"
import SignIn from "../auth/SignIn.jsx"
import SignUp from "../auth/SignUp.jsx"

const Stack = createStackNavigator()

export default function AuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerLeft: () => null,
      }}
    >
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

          headerTitleAlign: "center",
        }}
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
        options={{
          title: "Sign Up",

          headerTitleAlign: "center",
        }}
        name="SignUp"
        component={SignUp}
      />
    </Stack.Navigator>
  )
}
