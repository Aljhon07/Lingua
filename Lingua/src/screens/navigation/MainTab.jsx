import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Feather, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import Profile from "../profile/Profile"
import Translator from "../translator/Translator"
import BookingHistory from "../booking-history/BookingHistory"
import LessonNavigation from "./LessonNavigation"
import Explore from "../travel-package-listing/Explore"

const Tab = createBottomTabNavigator()

export default function MainTab() {
  const { navigate } = useNavigation()

  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{ headerShown: false, headerTransparent: false }}
    >
      <Tab.Screen
        name="Explore"
        component={Explore}
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
            // e.preventDefault()
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
          title: "Learn",
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
