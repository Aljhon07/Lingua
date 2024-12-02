import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TravelPackagesListing from "../travel-package-listing/TravelPackagesListing";
import Profile from "../profile/Profile";
import Learn from "../language-learning/Learn";
import Translator from "../translator/Translator";
import { Feather, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { useTheme } from "@context/ThemeProvider";
import { spacing } from "@constants/globalStyles";
import { useFontContext } from "@context/FontProvider";
import { Paragraph } from "@components/atoms/Typography";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const { theme } = useTheme();
  const { fonts } = useFontContext();

  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          height: 65,
          paddingTop: spacing.sm,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: fonts.MerriweatherRegular,
        },

        tabBarActiveTintColor: theme.active,
        tabBarInactiveTintColor: theme.inactive,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={TravelPackagesListing}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="travel-explore"
              size={24}
              color={focused ? theme.active : theme.inactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Learn"
        component={Learn}
        options={{
          tabBarIcon: ({ focused }) => (
            <SimpleLineIcons
              name="graduation"
              size={24}
              color={focused ? theme.active : theme.inactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Translator"
        component={Translator}
        options={{
          tabBarIcon: ({ focused }) => (
            <SimpleLineIcons
              name="microphone"
              size={24}
              color={focused ? theme.active : theme.inactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? theme.active : theme.inactive}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
