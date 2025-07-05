import { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { FlatList, RefreshControl } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { spacing } from "@constants/globalStyles"
import { LessonCard } from "./components/LessonCard"
import { useQueryState } from "@hooks/useQueryState"
import DataContainer from "@components/layouts/DataContainer"
import { fetchLessons } from "@services/directus/rest"
import { Text } from "react-native-paper"
import { LanguageList } from "@components/atoms/LanguageList"
import { useLanguageContext } from "@context/LanguageProvider"
import { useNavigation } from "@react-navigation/native"

export default function LessonList() {
  const navigation = useNavigation()
  const { getQueryState, executeQuery } = useQueryState()
  const styles = createStyles()
  const lesson = getQueryState("lesson")
  const { selectedLanguage } = useLanguageContext()

  useEffect(() => {
    executeQuery("lesson", fetchLessons)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineLarge" style={{ textAlign: "center", marginBottom: spacing.lg }}>
        Every Lesson Brings You Closer to Fluency
      </Text>
      <DataContainer
        loading={lesson.loading}
        error={lesson.error}
        data={lesson.data}
        noDataMessage={"No Lessons Found"}
        errorMessage={"Error Fetching Lessons"}
      >
        <LanguageList />
        <FlatList
          data={lesson.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <LessonCard
              title={`${item.name}`}
              selectedLanguage={selectedLanguage}
              id={item.id}
              description={item.description}
            />
          )}
          style={{ flex: 1, marginTop: spacing.md }}
          showsVerticalScrollIndicator={false}
        />
      </DataContainer>
    </SafeAreaView>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
    },
  })
