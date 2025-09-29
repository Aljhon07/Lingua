import React from "react"
import { StyleSheet, View } from "react-native"
import { Text, useTheme, TouchableRipple } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import StyledSurface from "@components/atoms/StyledSurface"
import { spacing, border } from "@constants/globalStyles"
import { formatDate } from "@utils/formatDate"
import { Pressable } from "react-native-gesture-handler"

export default function RichBookingCard({ booking, showActionHint = false }) {
  const { colors, roundness } = useTheme()
  const navigation = useNavigation()
  const styles = createStyles(colors, roundness)
  const { ticket, passengers } = booking

  const totalPrice = passengers.length * ticket.price

  const handlePress = () => {
    navigation.navigate("BookingDetailsNavigation", {
      screen: "BookingDetails",
      params: {
        bookingId: booking.id,
        status: booking.status,
      },
    })
  }

  const getStatusStyle = () => {
    const { status } = booking

    if (status === "Paid") {
      return {
        backgroundColor: colors.primaryContainer,
        color: colors.onPrimaryContainer,
      }
    } else if (["For Approval", "Approved"].includes(status)) {
      return {
        backgroundColor: colors.tertiaryContainer,
        color: colors.onTertiaryContainer,
      }
    } else if (["Cancelled", "Rejected"].includes(status)) {
      return {
        backgroundColor: colors.errorContainer,
        color: colors.onErrorContainer,
      }
    } else {
      return {
        backgroundColor: colors.secondaryContainer,
        color: colors.onSecondaryContainer,
      }
    }
  }

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      rippleColor={colors.primary.replace("1)", "0.2)")}
    >
      <StyledSurface style={styles.surface}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text variant="titleMedium" style={styles.packageName}>
              {ticket.travel_package.name}
            </Text>
            <Text variant="bodyMedium" style={styles.bookingId}>
              Booking ID: {booking.id}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={colors.onSurfaceVariant}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="calendar"
              size={16}
              color={colors.onSurfaceVariant}
            />
            <Text variant="bodyMedium" style={styles.detailText}>
              Booked: {formatDate(booking.date_created)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="account-group"
              size={16}
              color={colors.onSurfaceVariant}
            />
            <Text variant="bodyMedium" style={styles.detailText}>
              {passengers.length} passenger{passengers.length !== 1 ? "s" : ""}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="currency-php"
              size={16}
              color={colors.onSurfaceVariant}
            />
            <Text variant="bodyMedium" style={styles.detailText}>
              Total: ₱{totalPrice.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={[styles.statusBadge, getStatusStyle()]}>
            <Text
              variant="labelMedium"
              style={[styles.statusText, { color: getStatusStyle().color }]}
            >
              {booking.status.toUpperCase()}
            </Text>
          </View>
          {showActionHint && (
            <Text variant="bodySmall" style={styles.actionHint}>
              Tap to view itinerary
            </Text>
          )}
        </View>
      </StyledSurface>
    </Pressable>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    container: {
      marginVertical: spacing.xs,
    },
    surface: {
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.outline,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.md,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: roundness * 2,
      backgroundColor: colors.primaryContainer,
      alignItems: "center",
      justifyContent: "center",
      marginRight: spacing.md,
    },
    headerContent: {
      flex: 1,
    },
    packageName: {
      color: colors.onSurface,
      fontWeight: "600",
      marginBottom: spacing.xs,
    },
    bookingId: {
      color: colors.onSurfaceVariant,
    },
    divider: {
      height: 1,
      backgroundColor: colors.outlineVariant,
      marginBottom: spacing.md,
    },
    details: {
      marginBottom: spacing.md,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    detailText: {
      marginLeft: spacing.sm,
      color: colors.onSurfaceVariant,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    statusBadge: {
      padding: spacing.md,
      borderRadius: border.sm,
    },
    statusText: {
      fontWeight: "600",
    },
    actionHint: {
      color: colors.primary,
      fontStyle: "italic",
    },
  })
