import DataContainer from "@components/layouts/DataContainer"
import { CustomButton } from "@components/molecules/CustomButton"
import { spacing } from "@constants/globalStyles"
import { useQueryState } from "@hooks/useQueryState"
import { fetchLessons, fetchVocabulary } from "@services/directus/rest"
import { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Text, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

const test = [[{ hello: "test" }]]
export default function VocabularyList({ route }) {
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)
  const { id } = route.params
  const { executeQuery, getQueryState } = useQueryState()
  const vocabulary = getQueryState("vocabulary")

  useEffect(() => {
    ;(async () => {
      await executeQuery(
        "vocabulary",
        fetchVocabulary,
        `fields=[lesson][_eq]=${id}&fields=keyword,translation`
      )
    })()
  }, [])
  console.error("Vocab: ", vocabulary.data)

  const renderItem = ({ keyword, translation }) => {
    return (
      <View style={styles.vocabularyContainer}>
        <Text variant="bodyLarge" style={styles.vocabularyText}>
          {keyword}
        </Text>
        <Text variant="titleMedium" style={styles.vocabularyText}>
          {translation}
        </Text>
      </View>
    )
  }
  return (
    <DataContainer
      data={vocabulary.data}
      error={vocabulary.error}
      loading={vocabulary.loading}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <Text variant="titleLarge">Vocabulary</Text>
          <Text variant="bodyMedium">
            Before starting the vocabulary quiz, please remember the vocabulary
            list below!
          </Text>
        </View>
        <FlatList
          data={vocabulary.data}
          renderItem={({ item }) => renderItem(item)}
        />
        <CustomButton primary>Take Quiz</CustomButton>
      </SafeAreaView>
    </DataContainer>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: spacing.xl,
      paddingHorizontal: spacing.md,
      gap: spacing.md,
    },
    vocabularyContainer: {
      backgroundColor: "red",
      marginBottom: spacing.md,
      padding: spacing.lg,
      borderRadius: roundness,
    },
    vocabularyText: {
      textAlign: "center",
    },
  })
