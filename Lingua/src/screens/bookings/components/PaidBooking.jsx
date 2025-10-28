import StyledSurface from "@components/atoms/StyledSurface";
import DataContainer from "@components/layouts/DataContainer";
import { cloudinary } from "@constants/api";
import { spacing } from "@constants/globalStyles";
import { useQueryState } from "@hooks/useQueryState";
import { useFileDownload } from "@hooks/useFileDownload";
import { fetchBookingDetails } from "@services/directus/rest";
import { formatTimeStamp } from "@utils/formatDate";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, Snackbar, Divider, useTheme } from "react-native-paper";

// Reusable FlightDetails Component
const FlightDetails = ({
  title,
  departureLocation,
  arrivalLocation,
  departureDate,
  departureTime,
  arrivalDate,
  arrivalTime,
  pnr,
  ticketNumber,
  gate,
  seat,
  colors,
  styles,
}) => (
  <View style={styles.flightSection}>
    <Text
      variant="titleSmall"
      style={[styles.flightLabel, { color: colors.primary }]}
    >
      {title}
    </Text>
    <View style={styles.row}>
      <View>
        <Text variant="labelLarge">From:</Text>
        <Text variant="headlineSmall">{departureLocation}</Text>
        <Text>{departureDate}</Text>
        <Text>{departureTime}</Text>
      </View>

      <View>
        <Text style={styles.arrivalDetailsTxt} variant="labelLarge">
          To:
        </Text>
        <Text style={styles.arrivalDetailsTxt} variant="headlineSmall">
          {arrivalLocation}
        </Text>
        <Text style={styles.arrivalDetailsTxt}>{arrivalDate}</Text>
        <Text style={styles.arrivalDetailsTxt}>{arrivalTime}</Text>
      </View>
    </View>

    <View style={styles.row}>
      <View>
        <Text variant="labelLarge">PNR:</Text>
        <Text>{pnr}</Text>
      </View>
      <View>
        <Text variant="labelLarge">Ticket No.:</Text>
        <Text>{ticketNumber}</Text>
      </View>
      <View>
        <Text variant="labelLarge">Gate:</Text>
        <Text>{gate}</Text>
      </View>
      <View>
        <Text variant="labelLarge">Seat:</Text>
        <Text>{seat}</Text>
      </View>
    </View>
  </View>
);

export default function PaidBooking({ bookingId, navigation }) {
  const { executeQuery, getQueryState } = useQueryState();
  const bookingDetails = getQueryState("bookingDetails");
  const booking = bookingDetails.data?.data;
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { colors } = useTheme();

  // Create styles once with the current theme colors
  const styles = createStyles(colors);

  const { isDownloading, downloadFile } = useFileDownload();

  useEffect(() => {
    executeQuery("bookingDetails", fetchBookingDetails, {
      id: bookingId,
      filter:
        "fields=pnr,gate,passengers.name,passengers.ticket_number,passengers.seat,passengers.return_seat,date_created,ticket.*,ticket.return_ticket.*,booking_details_pdf",
    });
  }, []);

  const handleDownloadPress = () => {
    if (!booking?.booking_details_pdf) {
      setSnackbarMessage("No ticket available");
      setSnackbarVisible(true);
      return;
    }

    const url = cloudinary.images + booking.booking_details_pdf + ".pdf";
    const filename = `ticket_${booking.pnr || Date.now()}.pdf`;

    downloadFile(
      url,
      filename,
      (message) => {
        setSnackbarMessage(message);
        setSnackbarVisible(true);
      },
      (error) => {
        setSnackbarMessage(error);
        setSnackbarVisible(true);
      }
    );
  };
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <DataContainer
        error={bookingDetails.error}
        loading={bookingDetails.loading}
        data={booking}
      >
        <ScrollView style={styles.scrollContainer}>
          {booking?.passengers.map((passenger, index) => {
            // Outbound flight details
            const { date: outboundDate, time: outboundTime } = formatTimeStamp(
              booking?.ticket.departure_schedule
            );
            const { date: outboundArrivalDate, time: outboundArrivalTime } =
              formatTimeStamp(booking?.ticket.arrival_schedule);

            // Return flight details (if available)
            const returnTicket = booking?.ticket?.return_ticket[0];
            console.log("Return Ticket:", returnTicket);
            const hasReturnFlight =
              returnTicket && returnTicket.departure_schedule;

            let returnDepartureDate,
              returnDepartureTime,
              returnArrivalDate,
              returnArrivalTime;
            if (hasReturnFlight) {
              const { date: retDepDate, time: retDepTime } = formatTimeStamp(
                returnTicket.departure_schedule
              );
              const { date: retArrDate, time: retArrTime } = formatTimeStamp(
                returnTicket.arrival_schedule
              );
              returnDepartureDate = retDepDate;
              returnDepartureTime = retDepTime;
              returnArrivalDate = retArrDate;
              returnArrivalTime = retArrTime;
            }

            return (
              <StyledSurface style={styles.surfaceContainer} key={index}>
                <View style={styles.passengerHeader}>
                  <Text variant="labelLarge">
                    Passenger Name:{" "}
                    <Text variant="titleMedium">{passenger.name}</Text>
                  </Text>
                </View>

                {/* Outbound Flight Section */}
                <FlightDetails
                  title="Outbound Flight"
                  departureLocation={booking?.ticket.departure_location}
                  arrivalLocation={booking?.ticket.arrival_location}
                  departureDate={outboundDate}
                  departureTime={outboundTime}
                  arrivalDate={outboundArrivalDate}
                  arrivalTime={outboundArrivalTime}
                  pnr={booking.pnr}
                  ticketNumber={passenger.ticket_number}
                  gate={booking.gate}
                  seat={passenger.seat}
                  colors={colors}
                  styles={styles}
                />

                {/* Divider between flights */}
                {hasReturnFlight && <Divider style={styles.divider} />}

                {/* Return Flight Section */}
                {hasReturnFlight ? (
                  <FlightDetails
                    title="Return Flight"
                    departureLocation={returnTicket.departure_location}
                    arrivalLocation={returnTicket.arrival_location}
                    departureDate={returnDepartureDate}
                    departureTime={returnDepartureTime}
                    arrivalDate={returnArrivalDate}
                    arrivalTime={returnArrivalTime}
                    pnr={booking.pnr}
                    ticketNumber={passenger.ticket_number}
                    gate={booking.return || "TBD"}
                    seat={passenger.return_seat || "TBD"}
                    colors={colors}
                    styles={styles}
                  />
                ) : (
                  <View style={styles.noReturnSection}>
                    <Text variant="bodyMedium" style={styles.noReturnText}>
                      Return flight details will be available closer to your
                      departure date
                    </Text>
                  </View>
                )}
              </StyledSurface>
            );
          })}
        </ScrollView>
      </DataContainer>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: spacing.lg,
          marginHorizontal: spacing.lg,
        }}
      >
        <Button
          icon={"notebook"}
          mode="outlined"
          onPress={() =>
            navigation.navigate("CustomizeItinerary", { bookingId })
          }
          size={28}
          style={{ flex: 1 }}
        >
          View Itinerary
        </Button>
        <Button
          icon={isDownloading ? "loading" : "download"}
          mode="contained"
          onPress={handleDownloadPress}
          size={28}
          style={{ flex: 1 }}
          disabled={isDownloading || !booking?.booking_details_pdf}
          loading={isDownloading}
        >
          {isDownloading ? "Downloading..." : "Download Ticket"}
        </Button>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: "OK",
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    scrollContainer: {
      flex: 1,
    },
    surfaceContainer: {
      margin: spacing.lg,
    },
    passengerHeader: {
      marginBottom: spacing.md,
      paddingBottom: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0,0,0,0.1)",
    },
    flightSection: {
      marginBottom: spacing.md,
      paddingVertical: spacing.sm,
    },
    flightLabel: {
      marginBottom: spacing.sm,
      fontWeight: "600",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: spacing.sm,
    },
    arrivalDetailsTxt: {
      textAlign: "right",
    },
    divider: {
      marginVertical: spacing.md,
      backgroundColor: colors.outline,
    },
    noReturnSection: {
      marginTop: spacing.sm,
      padding: spacing.md,
      backgroundColor: "rgba(0,0,0,0.05)",
      borderRadius: spacing.sm,
      borderLeftWidth: 3,
      borderLeftColor: "#FF9800",
    },
    noReturnText: {
      fontStyle: "italic",
      color: "#666",
      textAlign: "center",
    },
  });
