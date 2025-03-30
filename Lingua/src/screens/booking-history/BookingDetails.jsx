import StyledSurface from "@components/atoms/StyledSurface"
import DataContainer from "@components/layouts/DataContainer"
import { spacing } from "@constants/globalStyles"
import { useQueryState } from "@hooks/useQueryState"
import { fetchBookingDetails } from "@services/directus/rest"
import React, { useEffect } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { Text } from "react-native-paper"
import PassengerSummary from "../flight-booking/components/PassengerSummary"
import TicketSummary from "../flight-booking/components/TicketSummary"
import PaymentMethodSummary from "../flight-booking/components/PaymentMethodSummary"
import ContactSummary from "../flight-booking/components/ContactSummary"
import { CustomButton } from "@components/molecules/CustomButton"
import UnpaidBooking from "./components/UnpaidBooking"

export default function BookingDetails({ route }) {
  const { bookingId, status } = route.params

  return <>{status != "Paid" && <UnpaidBooking bookingId={bookingId} />}</>
}
