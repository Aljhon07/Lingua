import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TravelPackagesListing from "../travel-package-listing/TravelPackagesListing"
import Profile from "../profile/Profile"
import Learn from "../language-learning/Learn"
import Translator from "../translator/Translator"
import { Feather, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons"
import { useThemeContext } from "@context/ThemeProvider"
import { spacing } from "@constants/globalStyles"
import { useFontContext } from "@context/FontProvider"

const Tab = createBottomTabNavigator()

export default function MainTab() {
  const { colors } = useThemeContext()
  const { fonts } = useFontContext()

  const tabBarIconsColor = {
    active: "#000000",
    inactive: "#949494",
  }
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 65,
          paddingTop: spacing.sm,
          borderTopWidth: 0,
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: fonts.MerriweatherRegular,
        },
        tabBarActiveTintColor: tabBarIconsColor.active,
        tabBarInactiveTintColor: tabBarIconsColor.inactive,
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
              color={
                focused ? tabBarIconsColor.active : tabBarIconsColor.inactive
              }
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
              color={
                focused ? tabBarIconsColor.active : tabBarIconsColor.inactive
              }
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
              color={
                focused ? tabBarIconsColor.active : tabBarIconsColor.inactive
              }
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
              color={
                focused ? tabBarIconsColor.active : tabBarIconsColor.inactive
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
