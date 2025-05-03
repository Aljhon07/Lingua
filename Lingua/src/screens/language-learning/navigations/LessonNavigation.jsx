import { createStackNavigator } from "@react-navigation/stack"
import VocabularyList from "../VocabularyList"
import Quiz from "../Quiz"
import LessonProvider from "@context/LessonProvider"
import LessonList from "../LessonList"

const LessonStack = createStackNavigator()

export default function LessonNavigation() {
  return (
    <LessonProvider>
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
          options={({ route }) => ({
            headerTitle: route.params.title,
          })}
          component={Quiz}
        />
      </LessonStack.Navigator>
    </LessonProvider>
  )
}
