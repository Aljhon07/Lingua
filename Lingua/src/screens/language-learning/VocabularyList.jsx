import DataContainer from "@components/layouts/DataContainer"
import { spacing } from "@constants/globalStyles"
import { useQueryState } from "@hooks/useQueryState"
import { fetchVocabulary } from "@services/directus/rest"
import { useEffect } from "react"
import { StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"
import { CustomButton } from "@components/molecules/CustomButton"
import { useLessonContext } from "@context/LessonProvider"

export default function VocabularyList({ route, navigation }) {
  const { id, title } = route.params
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)
  const { executeQuery, getQueryState } = useQueryState()
  const vocabulary = getQueryState("vocabulary")
  const { handleVocabList } = useLessonContext()

  useEffect(() => {
    if (!vocabulary.error && !vocabulary.loading && vocabulary.data) {
      handleVocabList(vocabulary.data)
      console.log("Vocabulary Data: ", JSON.stringify(vocabulary.data, null, 2))
    }
  }, [vocabulary.data])

  useEffect(() => {
    ;(async () => {
      await executeQuery("vocabulary", fetchVocabulary, {
        id,
        lang: "ja",
      })
    })()
  }, [])

  const handleQuizNavigation = () => {
    navigation.navigate("Quiz", { id, title })
  }

  return (
    <DataContainer
      data={vocabulary.data}
      error={vocabulary.error}
      loading={vocabulary.loading}
    >
      {/* Continue Here */}
      <CustomButton primary onPress={handleQuizNavigation}>
        Take Quiz
      </CustomButton>
    </DataContainer>
  )
}

const createStyles = (colors, roundness) => StyleSheet.create({})
