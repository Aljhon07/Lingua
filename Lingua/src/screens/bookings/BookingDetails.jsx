import React from "react"

import UnpaidBooking from "./components/UnpaidBooking"

export default function BookingDetails({ route }) {
  const { bookingId, status } = route.params

  return <>{status != "Paid" && <UnpaidBooking bookingId={bookingId} />}</>
}
