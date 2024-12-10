import { useEffect } from "react"
import { StyleSheet } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { spacing } from "@constants/globalStyles"
import { LessonCard } from "./components/LessonCard"
import { useQueryState } from "@hooks/useQueryState"
import DataContainer from "@components/layouts/DataContainer"
import { fetchLessons } from "@services/directus/rest"

export default function LessonList() {
  const { getQueryState, executeQuery } = useQueryState()
  const styles = createStyles()
  const lesson = getQueryState("lesson")

  useEffect(() => {
    executeQuery("lesson", fetchLessons)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <DataContainer
        loading={lesson.loading}
        error={lesson.error}
        data={lesson.data}
        noDataMessage={"No Lessons Found"}
        errorMessage={"Error Fetching Lessons"}
      >
        <FlatList
          data={lesson.data}
          renderItem={({ item }) => (
            <LessonCard
              title={item.name}
              id={item.id}
              description={item.description}
            />
          )}
        />
      </DataContainer>
    </SafeAreaView>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: spacing.xl,
      paddingHorizontal: spacing.md,
    },
  })
