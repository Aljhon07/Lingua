import StyledSurface from "@components/atoms/StyledSurface"
import DataContainer from "@components/layouts/DataContainer"
import { spacing } from "@constants/globalStyles"
import { useQueryState } from "@hooks/useQueryState"
import { fetchBookingDetails } from "@services/directus/rest"
import { formatTimeStamp } from "@utils/formatDate"
import React, { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Text } from "react-native-paper"
import Ticket from "src/screens/flight-booking/components/Ticket"

export default function PaidBooking({ bookingId }) {
  const { executeQuery, getQueryState } = useQueryState()
  const bookingDetails = getQueryState("bookingDetails")
  const booking = bookingDetails.data?.data

  useEffect(() => {
    executeQuery("bookingDetails", fetchBookingDetails, {
      id: bookingId,
      filter:
        "fields=pnr,gate,passengers.name,passengers.ticket_number,passengers.seat,date_created,ticket.*,ticket.return_ticket.*",
    })
  }, [])
  console.log(JSON.stringify(bookingDetails, null, 2))
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <DataContainer
        error={bookingDetails.error}
        loading={bookingDetails.loading}
        data={booking}
      >
        <ScrollView style={styles.scrollContainer}>
          {booking?.passengers.map((passenger, index) => {
            const { date, time } = formatTimeStamp(
              booking?.ticket.departure_schedule
            )
            const { date: _date, time: _time } = formatTimeStamp(
              booking?.ticket.arrival_schedule
            )
            return (
              <StyledSurface style={styles.surfaceContainer} key={index}>
                <View>
                  <Text variant="labelLarge">
                    Passenger Name: <Text> {passenger.name}</Text>
                  </Text>
                </View>
                <View style={styles.row}>
                  <View>
                    <Text variant="labelLarge">From:</Text>
                    <Text variant="headlineSmall">
                      {booking?.ticket.departure_location}
                    </Text>
                    <Text>{date}</Text>
                    <Text>{time}</Text>
                  </View>

                  <View>
                    <Text style={styles.arrivalDetailsTxt} variant="labelLarge">
                      To:
                    </Text>
                    <Text
                      style={styles.arrivalDetailsTxt}
                      variant="headlineSmall"
                    >
                      {booking?.ticket.arrival_location}
                    </Text>
                    <Text style={styles.arrivalDetailsTxt}>{_date}</Text>
                    <Text style={styles.arrivalDetailsTxt}>{_time}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View>
                    <Text variant="labelLarge">PNR:</Text>
                    <Text>{booking.pnr}</Text>
                  </View>
                  <View>
                    <Text variant="labelLarge">Ticket No.:</Text>
                    <Text>{passenger.ticket_number}</Text>
                  </View>
                  <View>
                    <Text variant="labelLarge">Gate:</Text>
                    <Text>{booking.gate}</Text>
                  </View>
                  <View>
                    <Text variant="labelLarge">Seat:</Text>
                    <Text>{passenger.seat}</Text>
                  </View>
                </View>

                <View style={styles.row}></View>
              </StyledSurface>
            )
          })}
        </ScrollView>
      </DataContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  surfaceContainer: {
    margin: spacing.lg,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrivalDetailsTxt: {
    textAlign: "right",
  },
})
