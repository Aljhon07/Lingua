import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, useTheme, IconButton } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { useNavigation } from "@react-navigation/native"
import { useQueryState } from "@hooks/useQueryState"
import { fetchBookings } from "@services/directus/rest"
import RichBookingCard from "../../bookings/components/RichBookingCard"
import PaddedView from "@components/atoms/PaddedView"
import { Section } from "@components/atoms/Section"
import StyledSurface from "@components/atoms/StyledSurface"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { formatDate } from "@utils/formatDate"
import { Pressable } from "react-native-gesture-handler"
import { border } from "@constants/globalStyles"

export default function LatestTicket() {
  const navigation = useNavigation()
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)
  const [cachedBooking, setCachedBooking] = useState(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const { getQueryState, executeQuery } = useQueryState()
  const bookingHistory = getQueryState("latest-booking")

  const fetchLatestBooking = () => {
    executeQuery(
      "latest-booking",
      fetchBookings,
      "fields=id,status,date_created,ticket.*,total_price,ticket.travel_package.name,passengers.*&sort=-date_updated&limit=1"
    )
  }

  useEffect(() => {
    // Initial fetch
    fetchLatestBooking()

    // Set up auto-refresh every 5 seconds
    const interval = setInterval(() => {
      fetchLatestBooking()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Update cached booking only when we have new data
  useEffect(() => {
    if (bookingHistory.data?.data?.[0]) {
      setCachedBooking(bookingHistory.data.data[0])
      setIsInitialLoad(false)
    } else if (bookingHistory.data && !bookingHistory.data.data?.length) {
      // Empty response - no bookings
      setCachedBooking(null)
      setIsInitialLoad(false)
    }
  }, [bookingHistory.data])

  const handleNavigateToBookings = () => {
    navigation.navigate("Bookings")
  }

  const censorBookingId = (id) => {
    if (!id) return ""
    const idStr = String(id)
    if (idStr.length <= 3) return "***"
    return idStr.slice(0, 3) + "*".repeat(idStr.length - 3)
  }

  const censorPrice = (price) => {
    if (!price) return "₱***"
    return "₱" + "*".repeat(String(price).length)
  }

  const getStatusStyle = (status) => {
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

  const handleCardPress = () => {
    if (cachedBooking) {
      navigation.navigate("BookingDetailsNavigation", {
        screen: "BookingDetails",
        params: {
          bookingId: cachedBooking.id,
          status: cachedBooking.status,
        },
      })
    }
  }

  const renderCensoredBookingCard = (booking) => {
    const { ticket, passengers } = booking

    return (
      <Pressable
        style={styles.cardContainer}
        onPress={handleCardPress}
        rippleColor={colors.primary.replace("1)", "0.2)")}
      >
        <StyledSurface style={styles.surface}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text variant="titleMedium" style={styles.packageName}>
                {ticket.travel_package.name}
              </Text>
              <Text variant="bodyMedium" style={styles.bookingId}>
                Booking ID:{" "}
                {showDetails ? booking.id : censorBookingId(booking.id)}
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
                {showDetails ? passengers.length : "***"} passenger
                {passengers.length !== 1 ? "s" : ""}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <MaterialCommunityIcons
                name="currency-php"
                size={16}
                color={colors.onSurfaceVariant}
              />
              <Text variant="bodyMedium" style={styles.detailText}>
                Total:{" "}
                {showDetails
                  ? `₱${booking?.total_price?.toLocaleString()}`
                  : censorPrice(booking?.total_price)}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={[styles.statusBadge, getStatusStyle(booking.status)]}>
              <Text
                variant="labelMedium"
                style={[
                  styles.statusText,
                  { color: getStatusStyle(booking.status).color },
                ]}
              >
                {booking.status.toUpperCase()}
              </Text>
            </View>
          </View>
        </StyledSurface>
      </Pressable>
    )
  }

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="bodyLarge">No bookings found.</Text>
        <Button mode="contained" onPress={() => navigation.navigate("Explore")}>
          Browse Packages
        </Button>
      </View>
    )
  }

  // Show loading only on initial load
  if (isInitialLoad) {
    return (
      <PaddedView>
        <Section
          headline="Latest Booking"
          headlineVariant="titleMedium"
          contentContainerStyle={styles.section}
          actionLabel="View All"
          onAction={handleNavigateToBookings}
        >
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge">Loading...</Text>
          </View>
        </Section>
      </PaddedView>
    )
  }

  return (
    <PaddedView>
      <Section
        headline="Latest Booking"
        headlineVariant="titleMedium"
        contentContainerStyle={styles.section}
        rightComponent={
          cachedBooking && (
            <IconButton
              icon={showDetails ? "eye-off" : "eye"}
              size={20}
              onPress={() => setShowDetails(!showDetails)}
              iconColor={colors.primary}
              style={styles.toggleButton}
            />
          )
        }
      >
        {cachedBooking
          ? renderCensoredBookingCard(cachedBooking)
          : renderEmptyState()}
      </Section>
    </PaddedView>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    section: {
      backgroundColor: "transparent",
      minHeight: 150,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: spacing.md,
      paddingVertical: spacing.xl,
    },
    toggleButton: {
      margin: 0,
      marginBottom: spacing.sm,
    },
    cardContainer: {
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
  })
