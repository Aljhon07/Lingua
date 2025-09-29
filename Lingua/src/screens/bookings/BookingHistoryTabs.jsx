import React, { useCallback, useMemo, useEffect } from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useTheme } from "react-native-paper"
import { useQueryState } from "@hooks/useQueryState"
import { fetchBookings } from "@services/directus/rest"
import BookingList from "./components/BookingList"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { StyleSheet } from "react-native"

const Tab = createMaterialTopTabNavigator()

function BookingTabScreen({ status, bookings, getBookingHistory }) {
  const filteredBookings = useMemo(() => {
    if (!bookings?.data?.data) return []

    return bookings.data.data.filter((booking) => {
      if (status === "All") return true
      if (status === "Pending")
        return ["For Approval", "Approved"].includes(booking.status)
      if (status === "Paid") return booking.status === "Paid"
      if (status === "Cancelled")
        return ["Cancelled", "Rejected"].includes(booking.status)
      return booking.status === status
    })
  }, [bookings?.data?.data, status])

  return (
    <BookingList
      bookings={{
        ...bookings,
        data: { data: filteredBookings },
      }}
      getBookingHistory={getBookingHistory}
    />
  )
}

export default function BookingHistoryTabs() {
  const { colors } = useTheme()
  const styles = createStyles(colors)
  const { getQueryState, executeQuery } = useQueryState()
  const bookingHistory = getQueryState("booking-history")

  const getBookingHistory = () => {
    executeQuery(
      "booking-history",
      fetchBookings,
      "fields=id,status,date_created,ticket.*,ticket.travel_package.name,passengers.*&sort=-date_updated"
    )
  }

  // Only fetch on initial mount - no more refetching on navigation
  useEffect(() => {
    if (!bookingHistory.data && !bookingHistory.loading) {
      getBookingHistory()
    }
  }, []) // Empty dependency array - only runs once on mount

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline} variant="headlineLarge">
        Every Booking Tells a Story – Here's Yours!
      </Text>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.surface,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.onSurfaceVariant,
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 3,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            textTransform: "none",
          },
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen name="All" options={{ title: "All" }}>
          {() => (
            <BookingTabScreen
              status="All"
              bookings={bookingHistory}
              getBookingHistory={getBookingHistory}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Pending" options={{ title: "Pending" }}>
          {() => (
            <BookingTabScreen
              status="Pending"
              bookings={bookingHistory}
              getBookingHistory={getBookingHistory}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Paid" options={{ title: "Paid" }}>
          {() => (
            <BookingTabScreen
              status="Paid"
              bookings={bookingHistory}
              getBookingHistory={getBookingHistory}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Cancelled" options={{ title: "Cancelled" }}>
          {() => (
            <BookingTabScreen
              status="Cancelled"
              bookings={bookingHistory}
              getBookingHistory={getBookingHistory}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headline: {
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      textAlign: "center",
    },
  })
