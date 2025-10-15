import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { spacing } from "@constants/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { useQueryState } from "@hooks/useQueryState";
import { fetchBookings } from "@services/directus/rest";
import RichBookingCard from "../../bookings/components/RichBookingCard";
import PaddedView from "@components/atoms/PaddedView";
import { Section } from "@components/atoms/Section";

export default function LatestTicket() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [cachedBooking, setCachedBooking] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { getQueryState, executeQuery } = useQueryState();
  const bookingHistory = getQueryState("latest-booking");

  const fetchLatestBooking = () => {
    executeQuery(
      "latest-booking",
      fetchBookings,
      "fields=id,status,date_created,ticket.*,total_price,ticket.travel_package.name,passengers.*&sort=-date_updated&limit=1"
    );
  };

  useEffect(() => {
    // Initial fetch
    fetchLatestBooking();

    // Set up auto-refresh every 5 seconds
    const interval = setInterval(() => {
      fetchLatestBooking();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update cached booking only when we have new data
  useEffect(() => {
    if (bookingHistory.data?.data?.[0]) {
      setCachedBooking(bookingHistory.data.data[0]);
      setIsInitialLoad(false);
    } else if (bookingHistory.data && !bookingHistory.data.data?.length) {
      // Empty response - no bookings
      setCachedBooking(null);
      setIsInitialLoad(false);
    }
  }, [bookingHistory.data]);

  const handleNavigateToBookings = () => {
    navigation.navigate("Bookings");
  };

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="bodyLarge">No bookings found.</Text>
        <Button mode="contained" onPress={() => navigation.navigate("Explore")}>
          Browse Packages
        </Button>
      </View>
    );
  };

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
    );
  }

  return (
    <PaddedView>
      <Section
        headline="Latest Booking"
        headlineVariant="titleMedium"
        contentContainerStyle={styles.section}
        actionLabel="View All"
        onAction={handleNavigateToBookings}
      >
        {cachedBooking ? (
          <RichBookingCard booking={cachedBooking} showActionHint={false} />
        ) : (
          renderEmptyState()
        )}
      </Section>
    </PaddedView>
  );
}

const createStyles = (colors) =>
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
  });
