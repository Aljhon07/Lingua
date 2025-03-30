import DataContainer from "@components/layouts/DataContainer"
import { spacing } from "@constants/globalStyles"
import { useQueryState } from "@hooks/useQueryState"
import { fetchBookings } from "@services/directus/rest"
import { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList, RefreshControl } from "react-native-gesture-handler"
import BookingOverview from "./components/BookingOverview"

export default function BookingHistory() {
  const { getQueryState, executeQuery } = useQueryState()
  const bookingHistory = getQueryState("booking-history")

  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)

  useEffect(() => {
    getBookingHistory()
  }, [])

  const getBookingHistory = () => {
    executeQuery(
      "booking-history",
      fetchBookings,
      "fields=*,passengers,ticket.price,ticket.travel_package.name"
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline} variant="headlineLarge">
        Every Booking Tells a Story – Here's Yours!
      </Text>
      <DataContainer
        loading={bookingHistory.loading}
        error={bookingHistory.error}
        data={bookingHistory.data?.data}
        noDataMessage={"Book your Package Now. ->>> button to explore screen"}
      >
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={bookingHistory.loading}
              onRefresh={getBookingHistory}
            />
          }
          style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          key={(index) => index}
          data={bookingHistory.data?.data}
          renderItem={({ item }) => <BookingOverview item={item} />}
          keyExtractor={(item, index) => item.id + index}
        />
      </DataContainer>
    </SafeAreaView>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headline: {
      marginBottom: spacing.xl,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
    },
    bookingItem: {
      backgroundColor: "red",
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: roundness,
    },
    details: {
      flex: 1,
      marginLeft: spacing.md,
    },
  })
