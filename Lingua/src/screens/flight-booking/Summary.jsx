import DataContainer from "@components/layouts/DataContainer"
import ButtonPair from "@components/molecules/ButtonPair"
import { spacing } from "@constants/globalStyles"
import { useQueryState } from "@hooks/useQueryState"
import { fetchTicketDetails } from "@services/directus/rest"
import React, { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useTheme } from "react-native-paper"
import TicketSummary from "./components/TicketSummary"
import PassengerSummary from "./components/PassengerSummary"
import ContactSummary from "./components/ContactSummary"
import PaymentMethodSummary from "./components/PaymentMethodSummary"
import { usePassengerInfoContext } from "@context/PassengerInfoProvider"
import { useNavigation } from "@react-navigation/native"

export default function Summary({ route }) {
  const { id, passengers } = route.params
  const { colors } = useTheme()
  const { executeQuery, getQueryState } = useQueryState()
  const styles = createStyle(colors)
  const ticketDetails = getQueryState("ticketDetails")
  const { data: ticket } = ticketDetails
  const navigation = useNavigation()
  const { getAllInfo, setTicket } = usePassengerInfoContext()

  useEffect(() => {
    setTicket(id)
    executeQuery("ticketDetails", fetchTicketDetails, { id })
  }, [])
  return (
    <View style={styles.screen}>
      <DataContainer
        loading={ticketDetails.loading}
        error={ticketDetails.error}
        data={ticketDetails.data}
        noDataMessage={"Can't find ticket details."}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.wrapper}>
            <PassengerSummary style={styles} passengers={passengers} />
            <ContactSummary />
            <PaymentMethodSummary />
            {ticket && (
              <TicketSummary
                ticket={ticket}
                returnTicket={ticket.return_ticket[0]}
                passengersCount={passengers.length}
              />
            )}
          </View>
        </ScrollView>
        <ButtonPair
          leftText="Back"
          rightText="Place Order"
          onPressLeft={() => navigation.goBack()}
          onPressRight={() =>
            navigation.navigate("MainTab", { screen: "Bookings" })
          }
          style={styles.buttonPair}
        />
      </DataContainer>
    </View>
  )
}

const createStyle = (colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "space-between",
    },
    scrollView: {},
    wrapper: {
      paddingHorizontal: spacing.lg,
      marginTop: spacing.sm,
    },
    buttonPair: {
      padding: spacing.lg,
    },
    text: {
      color: colors.onBackground,
    },
  })
