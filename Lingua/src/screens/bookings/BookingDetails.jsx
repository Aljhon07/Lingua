import React from "react"

import UnpaidBooking from "./components/UnpaidBooking"
import PaidBooking from "./components/PaidBooking"

export default function BookingDetails({ route, navigation }) {
  const { bookingId, status } = route.params

  return (
    <>
      {status != "Paid" ? (
        <UnpaidBooking bookingId={bookingId} />
      ) : (
        <PaidBooking bookingId={bookingId} navigation={navigation} />
      )}
    </>
  )
}
