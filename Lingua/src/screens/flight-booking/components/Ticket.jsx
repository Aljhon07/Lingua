import React from "react"
import { View, StyleSheet, Pressable } from "react-native"
import { Surface, Text, TouchableRipple } from "react-native-paper"
import { formatTimeStamp, getTimeDifference } from "@utils/formatDate"
import { spacing } from "@constants/globalStyles"
import { Divider } from "react-native-paper"
import { useTheme } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"

export default function Ticket({ ticket, interactable = true }) {
  console.log("Ticket", ticket)
  const navigation = useNavigation()
  const { colors } = useTheme()

  const styles = createStyle(colors)

  const handleNavigate = () => {
    navigation.navigate("PassengerInfo", { id: ticket.id })
  }

  return (
    <Surface style={styles.surface}>
      <TouchableRipple
        style={styles.ticket}
        borderless
        onPress={handleNavigate}
        disabled={!interactable}
      >
        <>
          <TicketDetails ticket={ticket} />
          {ticket.return_ticket[0] && (
            <>
              <Divider style={styles.divider} bold />
              <TicketDetails ticket={ticket.return_ticket[0]} />
            </>
          )}
        </>
      </TouchableRipple>
      <Pressable onPress={handleNavigate} disabled={!interactable}>
        <Text variant="titleLarge" style={styles.priceText}>
          ₱{ticket.price}
        </Text>
      </Pressable>
    </Surface>
  )
}

export function TicketDetails({ ticket }) {
  const departure = formatTimeStamp(ticket.departure_schedule)
  const arrival = formatTimeStamp(ticket.arrival_schedule)
  const timeDiff = getTimeDifference(
    ticket.departure_schedule,
    ticket.arrival_schedule
  )
  const { colors } = useTheme()

  const styles = createStyle(colors)

  return (
    <View style={styles.detailsContainer}>
      <View>
        <Text>{ticket.departure_location}</Text>
        <Text variant="headlineLarge">IATA</Text>
        <Text>{departure.date}</Text>
        <Text>{departure.time}</Text>
      </View>

      <View style={styles.dashedLineContainer}>
        <Text
          style={styles.dashedLineText}
          ellipsizeMode="clip"
          numberOfLines={1}
        >
          {"-------------"}
        </Text>
        <Text style={styles.textCenter}>{timeDiff}</Text>
      </View>

      <View>
        <Text style={styles.arrivalText}>{ticket.arrival_location}</Text>
        <Text variant="headlineLarge" style={styles.arrivalText}>
          IATA
        </Text>
        <Text style={styles.arrivalText}>{arrival.date}</Text>
        <Text style={styles.arrivalText}>{arrival.time}</Text>
      </View>
    </View>
  )
}

const createStyle = (colors) =>
  StyleSheet.create({
    surface: {
      borderRadius: spacing.md,
      borderWidth: 1,
      overflow: "hidden",
      borderColor: colors.primary,
    },
    ticket: {
      borderRadius: spacing.md,
      overflow: "hidden",
      paddingHorizontal: spacing.sm,
    },
    divider: {
      marginVertical: spacing.md,
    },
    textCenter: {
      textAlign: "center",
    },
    dashedLineContainer: {
      flex: 1,
      alignItems: "center",
    },
    dashedLineText: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
      color: colors.primary,
      letterSpacing: 10,
    },
    priceText: {
      padding: spacing.sm,
      textAlign: "center",
      backgroundColor: colors.primary,
      color: colors.onPrimary,
    },
    detailsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: spacing.md,
    },
    arrivalText: {
      textAlign: "right",
    },
  })
