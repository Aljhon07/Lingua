import { createStackNavigator } from "@react-navigation/stack";
import VocabularyList from "../VocabularyList";
import Quiz from "../Quiz";
import LessonProvider from "@context/LessonProvider";
import { useRoute } from "@react-navigation/native";

const LessonStack = createStackNavigator();

export default function LessonNavigation() {
  const route = useRoute();
  const { id, title } = route.params;
  return (
    <LessonProvider>
      <LessonStack.Navigator
        initialRouteName="VocabularyList"
        screenOptions={{ headerShown: true }}
      >
        <LessonStack.Screen
          name="VocabularyList"
          options={{
            headerTitle: title,
          }}
        >
          {(props) => <VocabularyList id={id} title={title} />}
        </LessonStack.Screen>
        <LessonStack.Screen
          name="Quiz"
          options={({ route }) => ({
            headerTitle: title,
          })}
          component={Quiz}
        />
      </LessonStack.Navigator>
    </LessonProvider>
  );
}
