import { createStackNavigator } from "@react-navigation/stack"
import LessonList from "../language-learning/LessonList"
import VocabularyList from "../language-learning/VocabularyList"
import Quiz from "../language-learning/Quiz"

const LessonStack = createStackNavigator()

export default function LessonNavigation() {
  return (
    <LessonStack.Navigator
      initialRouteName="LessonList"
      screenOptions={{ headerShown: true }}
    >
      <LessonStack.Screen
        name="LessonList"
        options={{
          headerShown: false,
        }}
        component={LessonList}
      />
      <LessonStack.Screen
        name="VocabularyList"
        options={({ route }) => ({
          headerTitle: route.params.title,
        })}
        component={VocabularyList}
      />

      <LessonStack.Screen
        name="Quiz"
        component={Quiz}
        options={({ route }) => ({
          headerTitle: route.params.title,
          headerLeft: () => null,
        })}
      />
    </LessonStack.Navigator>
  )
}
