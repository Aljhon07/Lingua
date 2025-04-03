import { spacing } from "@constants/globalStyles"
import { StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"
import { useEffect } from "react"
import { fetchTickets, uploadTransactions } from "@services/directus/rest"
import TicketList from "./TicketList"
import { useQueryState } from "@hooks/useQueryState"

export default function Booking({ route }) {
  const { travel_package } = route.params
  const { colors, roundness } = useTheme()

  const styles = createStyle(colors, roundness)
  const { getQueryState, executeQuery } = useQueryState()

  const tickets = getQueryState("tickets")

  const getTickets = async () => {
    const tickets = await executeQuery(
      "tickets",
      fetchTickets,
      travel_package.id
    )
  }
  useEffect(() => {
    getTickets()
  }, [])

  return <TicketList tickets={tickets} getTickets={getTickets} />
}

const createStyle = (colors, roundness) => StyleSheet.create({})
