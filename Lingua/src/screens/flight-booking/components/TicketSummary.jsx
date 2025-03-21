import StyledSurface from "@components/atoms/StyledSurface"
import TwoColumnsText from "@components/atoms/TwoColumnsText"
import { formatDate, formatTimeStamp } from "@utils/formatDate"
import React from "react"
import { Divider, Surface } from "react-native-paper"

export default function TicketSummary({
  ticket,
  passengersCount = 1,
  returnTicket,
}) {
  return (
    <StyledSurface>
      <TwoColumnsText
        leftText={`${ticket.departure_location} - ${ticket.arrival_location}`}
        rightText={formatTimeStamp(ticket.departure_schedule).date}
      />
      {returnTicket && (
        <TwoColumnsText
          leftText={`${returnTicket.departure_location} - ${returnTicket.arrival_location}`}
          rightText={formatTimeStamp(returnTicket.departure_schedule).date}
        />
      )}
      <Divider bold />
      <TwoColumnsText
        leftTextVariant="titleMedium"
        rightTextVariant="titleLarge"
        leftText="Total Price"
        rightText={`₱ ${ticket.price * passengersCount}`}
      />
    </StyledSurface>
  )
}
