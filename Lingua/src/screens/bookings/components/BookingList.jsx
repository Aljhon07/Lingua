import DataContainer from "@components/layouts/DataContainer"
import { spacing } from "@constants/globalStyles"
import React, { useCallback } from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "react-native-paper"
import { FlatList, RefreshControl } from "react-native-gesture-handler"
import RichBookingCard from "./RichBookingCard"
import { useQueryState } from "@hooks/useQueryState"
import { fetchBookings } from "@services/directus/rest"

export default function BookingList({ bookings, getBookingHistory }) {
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)
  const { executeQuery, getQueryState } = useQueryState()

  return (
    <DataContainer
      loading={bookings.loading}
      error={bookings.error}
      data={bookings.data?.data}
      noDataMessage={"No bookings found for this status."}
    >
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={bookings.loading}
            onRefresh={getBookingHistory}
          />
        }
        style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={bookings.data?.data}
        renderItem={({ item }) => <RichBookingCard booking={item} />}
        keyExtractor={(item, index) => item.id + index}
        showsVerticalScrollIndicator={false}
      />
    </DataContainer>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  })
