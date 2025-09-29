import React, { useEffect } from "react"
import { StyleSheet, View, FlatList, Pressable } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { RefreshControl } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { spacing } from "@constants/globalStyles"
import { useQueryState } from "@hooks/useQueryState"
import { fetchBookings } from "@services/directus/rest"
import DataContainer from "@components/layouts/DataContainer"
import StyledSurface from "@components/atoms/StyledSurface"

export default function ItineraryScreen() {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const styles = createStyles(colors)
  const { getQueryState, executeQuery } = useQueryState()
  const bookingsState = getQueryState("itinerary-bookings")

  const getItineraryBookings = () => {
    executeQuery(
      "itinerary-bookings",
      fetchBookings,
      "fields=id,status,date_created,ticket.*,ticket.travel_package.name,passengers.*&filter[status][_eq]=Paid&sort=-date_updated"
    )
  }

  useEffect(() => {
    if (!bookingsState.data && !bookingsState.loading) {
      getItineraryBookings()
    }
  }, [])

  const handleBookingPress = (bookingId) => {
    navigation.navigate("BookingDetailsNavigation", {
      screen: "CustomizeItinerary",
      params: {
        bookingId: bookingId,
      },
    })
  }

  const renderBookingItem = ({ item }) => (
    <Pressable
      style={styles.bookingItem}
      onPress={() => handleBookingPress(item.id)}
    >
      <StyledSurface style={styles.surface}>
        <View style={styles.itemContent}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="map-marker-path"
              size={24}
              color={colors.onPrimary}
            />
          </View>
          <View style={styles.textContent}>
            <Text variant="titleMedium" style={styles.packageName}>
              {item.ticket.travel_package.name}
            </Text>
            <Text variant="bodySmall" style={styles.bookingId}>
              Booking ID: {item.id.slice(0, 8)}...
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={colors.onSurfaceVariant}
          />
        </View>
      </StyledSurface>
    </Pressable>
  )

  const renderSeparator = () => <View style={styles.separator} />

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline} variant="headlineLarge">
        Your Travel Itineraries
      </Text>
      <Text style={styles.subtitle} variant="bodyLarge">
        Manage and view your paid booking itineraries
      </Text>

      <DataContainer
        loading={bookingsState.loading}
        error={bookingsState.error}
        data={bookingsState.data?.data}
        noDataMessage="No paid bookings found. Complete a booking to see your itinerary here!"
      >
        <FlatList
          data={bookingsState.data?.data}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
          refreshControl={
            <RefreshControl
              refreshing={bookingsState.loading}
              onRefresh={getItineraryBookings}
              colors={[colors.primary]}
            />
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </DataContainer>
    </SafeAreaView>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headline: {
      marginBottom: spacing.sm,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      textAlign: "center",
      color: colors.onBackground,
    },
    subtitle: {
      marginBottom: spacing.xl,
      paddingHorizontal: spacing.lg,
      textAlign: "center",
      color: colors.onSurfaceVariant,
    },
    listContainer: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    separator: {
      height: spacing.md,
    },
    bookingItem: {
      marginVertical: spacing.xs,
    },
    surface: {
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.outline,
    },
    itemContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primaryContainer,
      alignItems: "center",
      justifyContent: "center",
      marginRight: spacing.md,
    },
    textContent: {
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
  })
