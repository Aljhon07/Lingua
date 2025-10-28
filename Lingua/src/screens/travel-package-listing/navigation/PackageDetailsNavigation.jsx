import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import PackageDetails from "../PackageDetails";
import BookingNavigation from "src/screens/flight-booking/navigation/BookingNavigation";
import ContactSupport from "src/screens/profile/ContactSupport";
import BackButton from "@components/molecules/BackButton";
import ContactSupportButton from "@components/molecules/ContactSupportButton";

const Stack = createStackNavigator();

export default function PackageDetailsNavigation({ route }) {
  const { item } = route.params;
  const { colors } = useTheme();

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
        options={({ navigation }) => ({
          headerTitle: "",
          headerStyle: {
            backgroundColor: "transparent",
          },

          headerLeft: () => {
            return <BackButton />;
          },
          headerRight: () => (
            <ContactSupportButton
              onPress={() => navigation.navigate("ContactSupport")}
            />
          ),
          headerTransparent: true,
        })}
        initialParams={{ item }}
        component={PackageDetails}
      />
      <Stack.Screen
        name="ContactSupport"
        component={ContactSupport}
        options={{
          title: "Contact Support",
          headerShown: true,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.onSurface,
          headerTitleStyle: {
            color: colors.onSurface,
            fontWeight: "600",
          },
        }}
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
  );
}
