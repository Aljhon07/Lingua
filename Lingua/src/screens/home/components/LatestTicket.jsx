import React, { useEffect } from "react"
import { StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { useNavigation } from "@react-navigation/native"
import { useQueryState } from "@hooks/useQueryState"
import { fetchBookings } from "@services/directus/rest"
import BookingOverview from "../../bookings/components/BookingOverview"
import PaddedView from "@components/atoms/PaddedView"
import { Section } from "@components/atoms/Section"
import DataContainer from "@components/layouts/DataContainer"

export default function LatestTicket() {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const styles = createStyles(colors)
  const { getQueryState, executeQuery } = useQueryState()
  const bookingHistory = getQueryState("latest-booking")

  useEffect(() => {
    if (!bookingHistory.data && !bookingHistory.loading) {
      executeQuery(
        "latest-booking",
        fetchBookings,
        "fields=*,passengers,ticket.price,ticket.travel_package.name&sort=-date_updated&limit=1"
      )
    }
  }, [])

  const handleNavigateToBookings = () => {
    navigation.navigate("Bookings")
  }

  const latestBooking = bookingHistory.data?.data?.[0]

  return (
    <PaddedView>
      <Section
        headline="Latest Booking"
        headlineVariant="titleMedium"
        contentContainerStyle={styles.section}
        actionLabel="View All"
        onAction={handleNavigateToBookings}
      >
        <DataContainer
          loading={bookingHistory.loading}
          error={bookingHistory.error}
          data={latestBooking}
          noDataMessage="No bookings found."
        >
          {latestBooking && <BookingOverview item={latestBooking} />}
        </DataContainer>
      </Section>
    </PaddedView>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    section: {
      backgroundColor: "transparent",
      minHeight: 150,
    },
  })
