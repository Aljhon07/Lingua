import { useEffect } from "react"
import { fetchQuestions } from "@services/directus/rest"
import { useQueryState } from "@hooks/useQueryState"
import { useLessonContext } from "@context/LessonProvider"

export default function Quiz({ route, navigation }) {
  const { id, title } = route.params
  const { executeQuery, getQueryState } = useQueryState()
  const questions = getQueryState("questions")
  const { vocabList } = useLessonContext()

  if (!questions.error && !questions.loading && questions.data) {
    console.log("Vocabulary List: ", JSON.stringify(vocabList, null, 2))
    console.log("Quiz Data: ", JSON.stringify(questions.data, null, 2))
  }
  useEffect(() => {
    ;(async () => {
      await executeQuery("questions", fetchQuestions, {
        id,
        lang: "ja",
      })
    })()
  }, [])

  return <></>
}
