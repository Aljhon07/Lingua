import DataContainer from "@components/layouts/DataContainer"
import { useQueryState } from "@hooks/useQueryState"
import { fetchLessons } from "@services/directus/rest"
import { useEffect } from "react"
import { StyleSheet } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Learn() {
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
      >
        <FlatList
          data={lesson.data}
          renderItem={({ item }) => <Text>{item.title}</Text>}
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
    },
  })
