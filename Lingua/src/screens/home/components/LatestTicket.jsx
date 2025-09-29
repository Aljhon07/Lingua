import React, { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { useNavigation } from "@react-navigation/native"
import { useQueryState } from "@hooks/useQueryState"
import { fetchBookings } from "@services/directus/rest"
import RichBookingCard from "../../bookings/components/RichBookingCard"
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
        "fields=id,status,date_created,ticket.*,ticket.travel_package.name,passengers.*&sort=-date_updated&limit=1"
      )
    }
  }, [])

  const handleNavigateToBookings = () => {
    navigation.navigate("Bookings")
  }

  const latestBooking = bookingHistory.data?.data?.[0]

  const noBookings = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: spacing.md,
        }}
      >
        <Text variant="bodyLarge">No bookings found.</Text>
        <Button mode="contained" onPress={() => navigation.navigate("Explore")}>
          Browse Packages
        </Button>
      </View>
    )
  }
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
          noDataMessage={noBookings()}
        >
          {latestBooking && (
            <RichBookingCard booking={latestBooking} showActionHint={false} />
          )}
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
