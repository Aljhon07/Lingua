import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Translator from "../translator/Translator";
import Explore from "../travel-package-listing/Explore";
import { LessonListWrapper } from "../language-learning/LessonList";
import HomeScreen from "../home/HomeScreen.jsx";
import PhrasebookButton from "@components/atoms/PhrasebookButton";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const { navigate } = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        headerTransparent: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
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
        component={Translator}
        name="Translate"
        options={{
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="microphone" size={24} color={color} />
          ),
          headerRight: () => <PhrasebookButton />,
          headerShown: true,
        }}
      />

      <Tab.Screen
        name="LessonsNavigation"
        component={LessonListWrapper}
        options={{
          title: "Learn",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="graduation" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
