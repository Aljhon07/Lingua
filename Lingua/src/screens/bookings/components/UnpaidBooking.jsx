import StyledSurface from "@components/atoms/StyledSurface"
import DataContainer from "@components/layouts/DataContainer"
import { spacing } from "@constants/globalStyles"
import { useQueryState } from "@hooks/useQueryState"
import { fetchBookingDetails } from "@services/directus/rest"
import React, { useEffect } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { Text } from "react-native-paper"
import PassengerSummary from "src/screens/flight-booking/components/PassengerSummary"
import TicketSummary from "src/screens/flight-booking/components/TicketSummary"
import PaymentMethodSummary from "src/screens/flight-booking/components/PaymentMethodSummary"
import ContactSummary from "src/screens/flight-booking/components/ContactSummary"
import { CustomButton } from "@components/molecules/CustomButton"
import { useNavigation } from "@react-navigation/native"

export default function UnpaidBooking({ bookingId }) {
  const { executeQuery, getQueryState } = useQueryState()
  const bookingDetails = getQueryState("bookingDetails")
  const booking = bookingDetails.data?.data
  const navigation = useNavigation()
  useEffect(() => {
    executeQuery("bookingDetails", fetchBookingDetails, {
      id: bookingId,
      filter:
        "fields=phone_number,payment_method,email_address,status,date_created,passengers.name,ticket.*,ticket.return_ticket.*",
    })
  }, [])

  const handleCheckout = () => {
    navigation.navigate("Checkout", {
      bookingId: bookingId,
      paymentMethod: booking?.payment_method,
    })
  }
  return (
    <DataContainer
      data={bookingDetails.data?.data}
      loading={bookingDetails.loading}
      error={bookingDetails.error}
    >
      <ScrollView style={{ padding: spacing.lg }}>
        <StyledSurface variant="bodyLarge">
          <Text variant="headlineSmall">{booking?.status}</Text>
        </StyledSurface>
        <PassengerSummary passengers={booking?.passengers} />
        <PaymentMethodSummary paymentMethod={booking?.payment_method} />
        <ContactSummary
          contactInfo={{
            phoneNumber: booking?.phone_number,
            emailAddress: booking?.email_address,
          }}
        />
        <TicketSummary
          ticket={booking?.ticket}
          returnTicket={booking?.ticket.return_ticket[0]}
          passengersCount={booking?.passengers.length}
        />
      </ScrollView>
      {booking?.status === "Approved" && (
        <CustomButton
          primary
          onPress={handleCheckout}
          style={{ margin: spacing.lg }}
        >
          Pay Now
        </CustomButton>
      )}
    </DataContainer>
  )
}
