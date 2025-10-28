import StyledSurface from "@components/atoms/StyledSurface";
import DataContainer from "@components/layouts/DataContainer";
import { spacing } from "@constants/globalStyles";
import { useQueryState } from "@hooks/useQueryState";
import { fetchBookingDetails, cancelBooking } from "@services/directus/rest";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text, Button, useTheme } from "react-native-paper";
import PassengerSummary from "src/screens/flight-booking/components/PassengerSummary";
import TicketSummary from "src/screens/flight-booking/components/TicketSummary";
import PaymentMethodSummary from "src/screens/flight-booking/components/PaymentMethodSummary";
import ContactSummary from "src/screens/flight-booking/components/ContactSummary";
import { useNavigation } from "@react-navigation/native";
import StripePay from "./StripePay";
import { Alert, View } from "react-native";
import { CustomButton } from "@components/molecules/CustomButton";

export default function UnpaidBooking({ bookingId }) {
  const { executeQuery, getQueryState, refreshQuery } = useQueryState();
  const bookingDetails = getQueryState("bookingDetails");
  const booking = bookingDetails.data?.data;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();

  const fetchBookingData = () => {
    executeQuery("bookingDetails", fetchBookingDetails, {
      id: bookingId,
      filter:
        "fields=phone_number,payment_method,email_address,status,date_created,passengers.name,passengers.return_seat,ticket.*,ticket.return_ticket.*,total_price",
    });
  };

  const handleRefreshBooking = () => {
    fetchBookingData();
  };

  const handleCancelBooking = () => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking? This action cannot be undone.",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: async () => {
            try {
              setIsLoading(true);
              await cancelBooking(bookingId);
              Alert.alert(
                "Booking Cancelled",
                "Your booking has been successfully cancelled.",
                [
                  {
                    text: "OK",
                    onPress: () => navigation.goBack(),
                  },
                ]
              );
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to cancel booking. Please try again."
              );
              console.error("Cancel booking error:", error);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  // const handleCheckout = () => {
  //   navigation.navigate("Checkout", {
  //     bookingId: bookingId,
  //     paymentMethod: booking?.payment_method,
  //   })
  // }
  return (
    <DataContainer
      data={bookingDetails.data?.data}
      loading={bookingDetails.loading}
      error={bookingDetails.error}
    >
      <ScrollView style={{ padding: spacing.lg }}>
        <StyledSurface variant="bodyLarge">
          <Text variant="headlineSmall">{booking?.status}</Text>
        </StyledSurface>
        <PassengerSummary passengers={booking?.passengers} />
        <PaymentMethodSummary paymentMethod={booking?.payment_method} />
        <ContactSummary
          contactInfo={{
            phoneNumber: booking?.phone_number,
            emailAddress: booking?.email_address,
          }}
        />
        <TicketSummary
          ticket={booking?.ticket}
          returnTicket={booking?.ticket.return_ticket[0]}
          passengersCount={booking?.passengers.length}
          total_price={booking?.total_price}
        />
      </ScrollView>
      {booking?.status === "Approved" && (
        <View style={{ padding: spacing.lg }}>
          <View
            style={{
              flexDirection: "row",
              gap: spacing.md,
              alignItems: "flex-end",
            }}
          >
            <View style={{ flex: 1 }}>
              <StripePay
                price={booking?.passengers.length * booking?.ticket.price}
                bookingId={bookingId}
                onPaymentSuccess={handleRefreshBooking}
                style={{ margin: 0 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <CustomButton
                mode="contained"
                onPress={handleCancelBooking}
                loading={isLoading}
                disabled={isLoading}
                style={{
                  backgroundColor: colors.errorContainer,
                  margin: 0,
                }}
                labelStyle={{
                  color: colors.onErrorContainer,
                }}
              >
                Cancel Booking
              </CustomButton>
            </View>
          </View>
        </View>
      )}
      {booking?.status === "For Approval" && (
        <View style={{ padding: spacing.lg }}>
          <CustomButton
            mode="contained"
            onPress={handleCancelBooking}
            loading={isLoading}
            disabled={isLoading}
            style={{
              backgroundColor: colors.errorContainer,
            }}
            labelStyle={{
              color: colors.onErrorContainer,
            }}
          >
            Cancel Booking
          </CustomButton>
        </View>
      )}
    </DataContainer>
  );
}
