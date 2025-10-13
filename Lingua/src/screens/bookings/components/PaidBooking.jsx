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
import { Button, Text, Snackbar } from "react-native-paper";
import * as FileSystem from "expo-file-system";

export default function PaidBooking({ bookingId, navigation }) {
  const { executeQuery, getQueryState } = useQueryState();
  const bookingDetails = getQueryState("bookingDetails");
  const booking = bookingDetails.data?.data;
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { isDownloading, downloadFile } = useFileDownload();

  useEffect(() => {
    executeQuery("bookingDetails", fetchBookingDetails, {
      id: bookingId,
      filter:
        "fields=pnr,gate,passengers.name,passengers.ticket_number,passengers.seat,date_created,ticket.*,ticket.return_ticket.*,booking_details_pdf",
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
            const { date, time } = formatTimeStamp(
              booking?.ticket.departure_schedule
            );
            const { date: _date, time: _time } = formatTimeStamp(
              booking?.ticket.arrival_schedule
            );
            return (
              <StyledSurface style={styles.surfaceContainer} key={index}>
                <View>
                  <Text variant="labelLarge">
                    Passenger Name: <Text> {passenger.name}</Text>
                  </Text>
                </View>
                <View style={styles.row}>
                  <View>
                    <Text variant="labelLarge">From:</Text>
                    <Text variant="headlineSmall">
                      {booking?.ticket.departure_location}
                    </Text>
                    <Text>{date}</Text>
                    <Text>{time}</Text>
                  </View>

                  <View>
                    <Text style={styles.arrivalDetailsTxt} variant="labelLarge">
                      To:
                    </Text>
                    <Text
                      style={styles.arrivalDetailsTxt}
                      variant="headlineSmall"
                    >
                      {booking?.ticket.arrival_location}
                    </Text>
                    <Text style={styles.arrivalDetailsTxt}>{_date}</Text>
                    <Text style={styles.arrivalDetailsTxt}>{_time}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View>
                    <Text variant="labelLarge">PNR:</Text>
                    <Text>{booking.pnr}</Text>
                  </View>
                  <View>
                    <Text variant="labelLarge">Ticket No.:</Text>
                    <Text>{passenger.ticket_number}</Text>
                  </View>
                  <View>
                    <Text variant="labelLarge">Gate:</Text>
                    <Text>{booking.gate}</Text>
                  </View>
                  <View>
                    <Text variant="labelLarge">Seat:</Text>
                    <Text>{passenger.seat}</Text>
                  </View>
                </View>

                <View style={styles.row}></View>
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

const styles = StyleSheet.create({
  surfaceContainer: {
    margin: spacing.lg,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrivalDetailsTxt: {
    textAlign: "right",
  },
});
