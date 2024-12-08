import DataContainer from "@components/layouts/DataContainer"
import { useQueryState } from "@hooks/useQueryState"
import { fetchPackageItinerary } from "@services/directus/rest"
import { useEffect } from "react"
import { FlatList } from "react-native-gesture-handler"
import { ItineraryCard } from "./components/ItineraryCard"
import { StyleSheet, View } from "react-native"
import { spacing } from "@constants/globalStyles"

export function PackageItinerary({ route }) {
  const { data: packageDetails } = route.params
  const { executeQuery, getQueryState } = useQueryState()
  const itinerary = getQueryState("itinerary")

  console.error(itinerary)
  useEffect(() => {
    executeQuery("itinerary", fetchPackageItinerary, packageDetails.id)
  }, [])
  return (
    <DataContainer
      errorMesssage={"Failed to fetch Itinerary"}
      error={itinerary.error}
      data={itinerary.data}
      loading={itinerary.loading}
    >
      <View style={styles.container}>
        <FlatList
          data={itinerary.data}
          renderItem={({ item }) => <ItineraryCard item={item} />}
        />
      </View>
    </DataContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    flex: 1,
  },
})
