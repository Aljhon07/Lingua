export function generateBookingDetails(booking) {
  return {
    pnr: generatePNR(),
    gate: generateGate(),
    passengers: assignSeats(booking.passengers),
  }
}

export function generatePNR() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function generateGate() {
  return `G${Math.floor(Math.random() * 20) + 1}`
}

export function generateTicketNumber() {
  return `TKT${Math.floor(100000 + Math.random() * 900000)}`
}

export function assignSeats(passengers) {
  const row = Math.floor(Math.random() * 30) + 1
  const startSeatIndex = Math.floor(Math.random() * 4) // Ensure enough seats are available
  const seatLetters = "ABCDEF".split("")

  return passengers.map((passenger, index) => ({
    id: passenger,
    ticket_number: generateTicketNumber(),
    seat: `${row}${seatLetters[startSeatIndex + index]}`,
  }))
}
