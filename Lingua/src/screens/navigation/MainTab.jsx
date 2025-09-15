import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Feather, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import ProfileNavigation from "../profile/navigation/ProfileNavigation"
import Translator from "../translator/Translator"
import BookingHistory from "../bookings/BookingHistory"
import Explore from "../travel-package-listing/Explore"
import LessonList from "../language-learning/LessonList"
import PhrasebookButton from "@components/atoms/PhrasebookButton"

const Tab = createBottomTabNavigator()

export default function MainTab() {
  const { navigate } = useNavigation()

  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={({ route }) => ({
        headerShown: false,
        headerTransparent: false,
      })}
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
        name="Translate"
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
          headerRight: () => <PhrasebookButton />,
          headerShown: true
        }}
      />
      <Tab.Screen
        name="LessonsNavigation"
        component={LessonList}
        options={{
          title: "Learn",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="graduation" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
