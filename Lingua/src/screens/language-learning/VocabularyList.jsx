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

export default function VocabularyList({ route, navigation }) {
  const { id, title } = route.params
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)
  const { executeQuery, getQueryState } = useQueryState()
  const vocabulary = getQueryState("vocabulary")

  useEffect(() => {
    ;(async () => {
      await executeQuery("vocabulary", fetchVocabulary, {
        id,
        filter: `fields=keyword,translation`,
      })
    })()
  }, [])

  const handleQuizNavigation = () => {
    navigation.navigate("Quiz", { id, title })
  }

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
      <View style={styles.container}>
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
        <CustomButton primary onPress={handleQuizNavigation}>
          Take Quiz
        </CustomButton>
      </View>
    </DataContainer>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      gap: spacing.md,
    },
    vocabularyContainer: {
      backgroundColor: colors.surfaceVariant,
      marginBottom: spacing.md,
      padding: spacing.lg,
      borderRadius: roundness,
    },
    vocabularyText: {
      textAlign: "center",
    },
  })
