import DataContainer from "@components/layouts/DataContainer"
import { useQueryState } from "@hooks/useQueryState"
import { fetchQuizzes } from "@services/directus/rest"
import { useEffect } from "react"
import { View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { GameHandler } from "./components/GameHandler"
import { spacing } from "@constants/globalStyles"

export default function Quiz({ route }) {
  const { id } = route.params
  const { getQueryState, executeQuery } = useQueryState()
  const quizzes = getQueryState("quizzes")

  useEffect(() => {
    ;(async () => {
      executeQuery("quizzes", fetchQuizzes, {
        id,
        filter: "fields=questions.*,questions.answers.*",
      })
    })()
  }, [])
  console.error("Quiz: ", JSON.stringify(quizzes.data))
  return (
    <View style={styles.container}>
      <DataContainer
        loading={quizzes.loading}
        error={quizzes.error}
        data={quizzes.data}
      >
        <GameHandler data={quizzes.data}></GameHandler>
      </DataContainer>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    padding: spacing.md,
  },
}
