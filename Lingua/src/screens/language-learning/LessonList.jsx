import { useEffect } from "react"
import { StyleSheet } from "react-native"
import { FlatList, RefreshControl } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { spacing } from "@constants/globalStyles"
import { LessonCard } from "./components/LessonCard"
import { useQueryState } from "@hooks/useQueryState"
import DataContainer from "@components/layouts/DataContainer"
import { fetchLessons } from "@services/directus/rest"
import { Text } from "react-native-paper"
import { Section } from "@components/atoms/Section"
import LessonProvider from "@context/LessonProvider"

export default function LessonList() {
  const { getQueryState, executeQuery } = useQueryState()
  const styles = createStyles()
  const lesson = getQueryState("lesson")

  useEffect(() => {
    executeQuery("lesson", fetchLessons)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineLarge">
        Every Lesson Brings You Closer to Fluency. Start Now!
      </Text>
      <DataContainer
        loading={lesson.loading}
        error={lesson.error}
        data={lesson.data}
        noDataMessage={"No Lessons Found"}
        errorMessage={"Error Fetching Lessons"}
      >
        <Section
          headline="Lessons"
          contentContainerStyle={{
            backgroundColor: "transparent",
            padding: 0,
          }}
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
        </Section>
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
      paddingHorizontal: spacing.lg,
      marginTop: spacing.xl,
      gap: spacing.lg,
    },
  })
