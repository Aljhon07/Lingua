import DataContainer from "@components/layouts/DataContainer"
import { fetchTicketDetails } from "@services/directus/rest"
import React, { useEffect } from "react"
import Ticket from "./components/Ticket"
import PaddedView from "@components/atoms/PaddedView"
import { StyleSheet, View } from "react-native"
import { spacing } from "@constants/globalStyles"
import ButtonPair from "@components/molecules/ButtonPair"
import PassengerInputContainer from "./components/PassengerInputContainer"
import { useQueryState } from "@hooks/useQueryState"
import { usePassengerInfoContext } from "@context/PassengerInfoProvider"
import { useNavigation } from "@react-navigation/native"
import ContactInput from "./components/ContactInput"
import { ScrollView } from "react-native-gesture-handler"
import PaymentMethodInput from "./components/PaymentMethodInput"

export default function PassengerInfo({ route }) {
  const { id } = route.params
  const { passengers } = usePassengerInfoContext()

  const navigation = useNavigation()

  const { executeQuery, getQueryState } = useQueryState()

  const ticket = getQueryState("ticketDetails")
  const styles = createStyle()

  const handleGoBack = () => {
    navigation.goBack()
  }
  const handleGoToSummary = () => {
    navigation.navigate("Summary", { id, passengers })
  }
  useEffect(() => {
    executeQuery("ticketDetails", fetchTicketDetails, { id })
  }, [])

  return (
    <PaddedView style={styles.screen}>
      <DataContainer
        loading={ticket.loading}
        error={ticket.error}
        data={ticket.data}
        noDataMessage={"Can't find ticket details."}
      >
        <ScrollView style={styles.wrapper}>
          <View style={styles.inputWrapper}>
            <Ticket ticket={ticket.data} interactable={false}></Ticket>
            <ContactInput />
            <PaymentMethodInput />
            <PassengerInputContainer />
          </View>
        </ScrollView>
        <ButtonPair
          leftText="Back"
          rightText="Next"
          onPressLeft={handleGoBack}
          onPressRight={handleGoToSummary}
        />
      </DataContainer>
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
    inputWrapper: { gap: spacing.lg },
    wrapper: { flex: 1, marginBottom: spacing.lg, gap: spacing.lg },
  })
