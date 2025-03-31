import React from "react"
import { Text, TouchableRipple } from "react-native-paper"
import { Pressable, StyleSheet, View } from "react-native"
import { useTheme } from "react-native-paper"
import StyledSurface from "@components/atoms/StyledSurface"
import { useNavigation } from "@react-navigation/native"
import { formatDate, formatTimeStamp } from "@utils/formatDate"
import { border, spacing } from "@constants/globalStyles"

export default function BookingOverview({ item }) {
  const navigation = useNavigation()
  console.log("TItem: ", JSON.stringify(item))
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)
  const { ticket, passengers } = item

  const handleNavigate = () => {
    navigation.navigate("BookingDetailsNavigation", {
      screen: "BookingDetails",
      params: {
        bookingId: item.id,
        status: item.status,
      },
    })
  }

  const getStatusStyle = () => {
    if (item.status === "Approved" || item.status === "Paid") {
      return styles.approved
    } else if (item.status === "For Approval") {
      return styles.pending
    } else {
      return styles.cancel
    }
  }
  return (
    <Pressable style={styles.bookingItem} onPress={handleNavigate}>
      <StyledSurface>
        <View style={styles.row}>
          <Text variant="titleLarge" style={{ flex: 1 }}>
            {item.ticket.travel_package.name}
          </Text>
          <Text variant="labelLarge" style={[styles.status, getStatusStyle()]}>
            {item.status}
          </Text>
        </View>
        <Text variant="bodyLarge">
          Booked Date: {formatDate(item.date_created)}
        </Text>
        <Text variant="bodyLarge">
          Total Price: {passengers.length * item.ticket.price}
        </Text>
      </StyledSurface>
    </Pressable>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    bookingItem: {},
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    status: {
      backgroundColor: "red",
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: border.md,
    },
    cancel: {
      backgroundColor: colors.error,
    },
    approved: {
      backgroundColor: colors.success,
      color: colors.surfaceVariant,
    },
    pending: {
      backgroundColor: "orange",
      color: colors.surfaceVariant,
    },
  })
