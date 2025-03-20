import DataContainer from "@components/layouts/DataContainer"
import { useQueryState } from "@hooks/useQueryState"
import { fetchTicketDetails } from "@services/directus/rest"
import React, { useEffect } from "react"
import Ticket from "./components/Ticket"
import PaddedView from "@components/atoms/PaddedView"
import { StyleSheet, View } from "react-native"
import { spacing } from "@constants/globalStyles"
import PassengerInput from "./components/PassengerInput"
import { Section } from "@components/atoms/Section"
import ButtonPair from "@components/molecules/ButtonPair"
import PassengerInputContainer from "./components/PassengerInputContainer"

export default function PassengerInfo({ route }) {
  const { id } = route.params
  const { executeQuery, getQueryState } = useQueryState()
  const ticket = getQueryState("ticketDetails")
  const styles = createStyle()

  useEffect(() => {
    executeQuery("ticketDetails", fetchTicketDetails, id)
  }, [])

  return (
    <PaddedView style={styles.screen}>
      <View style={styles.wrapper}>
        <DataContainer
          loading={ticket.loading}
          error={ticket.error}
          data={ticket.data}
          noDataMessage={"Can't find ticket details."}
        >
          <Ticket ticket={ticket.data} interactable={false}></Ticket>
          <Section headline={"Passengers"}>
            <PassengerInputContainer />
          </Section>
        </DataContainer>
      </View>
      <ButtonPair leftText="Back" rightText="Next" />
    </PaddedView>
  )
}

const createStyle = (colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "space-between",
      paddingBottom: spacing.lg,
    },
    wrapper: { gap: spacing.md },
  })
