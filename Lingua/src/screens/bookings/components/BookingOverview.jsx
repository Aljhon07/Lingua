import React from "react"
import { Text, TouchableRipple } from "react-native-paper"
import { Pressable, StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"
import StyledSurface from "@components/atoms/StyledSurface"
import { useNavigation } from "@react-navigation/native"
import { formatDate, formatTimeStamp } from "@utils/formatDate"

export default function BookingOverview({ item }) {
  const navigation = useNavigation()
  console.log("TItem: ", JSON.stringify(item))
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)
  const { ticket, passengers } = item

  const handleNavigate = () => {
    navigation.navigate("BookingDetails", {
      bookingId: item.id,
      status: item.status,
    })
  }
  return (
    <Pressable style={styles.bookingItem} onPress={handleNavigate}>
      <StyledSurface>
        <Text variant="titleLarge">{item.ticket.travel_package.name}</Text>
        <Text variant="bodyLarge">
          Booked Date: {formatDate(item.date_created)}
        </Text>
        <Text variant="bodyLarge">
          Total Price: {passengers.length * item.ticket.price}
        </Text>
        <Text>Status: {item.status}</Text>
      </StyledSurface>
    </Pressable>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    bookingItem: {},
  })
