import { createStackNavigator } from "@react-navigation/stack"
import LessonList from "../language-learning/LessonList"
import VocabularyList from "../language-learning/VocabularyList"

const Stack = createStackNavigator()

export default function LessonNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="LessonList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LessonList" component={LessonList} />
      <Stack.Screen name="VocabularyList" component={VocabularyList} />
    </Stack.Navigator>
  )
}
