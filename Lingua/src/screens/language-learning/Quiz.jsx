import { useEffect } from "react";
import { fetchQuestions } from "@services/directus/rest";
import { useQueryState } from "@hooks/useQueryState";
import { useLessonContext } from "@context/LessonProvider";
import { useLanguageContext } from "@context/LanguageProvider";
import { FlatList } from "react-native-gesture-handler";
import Vocabulary from "./components/Vocabulary";
import GameManager from "./components/GameManager";

export default function Quiz({ route, navigation }) {
  const { id, title } = route.params;
  const { executeQuery, getQueryState } = useQueryState();
  const questions = getQueryState("questions");
  const { vocabList } = useLessonContext();
  const { selectedLanguage } = useLanguageContext();

  console.log("Vocabulary List: ", JSON.stringify(vocabList, null, 2));

  useEffect(() => {
    (async () => {
      await executeQuery("questions", fetchQuestions, {
        id,
        lang: selectedLanguage.code,
      });
    })();
  }, []);

  return <GameManager vocabList={vocabList} />;
}
