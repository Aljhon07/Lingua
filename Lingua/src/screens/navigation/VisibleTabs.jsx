import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Feather, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import TravelPackagesListing from "../travel-package-listing/TravelPackagesListing"
import Profile from "../profile/Profile"
import Translator from "../translator/Translator"
import BookingHistory from "../booking-history/BookingHistory"
import LessonNavigation from "./LessonNavigation"

const Tab = createBottomTabNavigator()

export default function VisibleTabs() {
  const { navigate } = useNavigation()

  return (
    <Tab.Navigator
      initialRouteName="Explore"
      p
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={TravelPackagesListing}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="travel-explore" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={BookingHistory}
        name="Bookings"
        options={{
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="book-open" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={Translator}
        name="Translator"
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault()
            navigate("Translator")
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="microphone" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LessonsNavigation"
        component={LessonNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="graduation" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
