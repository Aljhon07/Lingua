import React, { useEffect, useState } from "react";
import { View, Alert, Button } from "react-native";
import { StripeProvider, usePaymentSheet } from "@stripe/stripe-react-native";
import { domain, server } from "@constants/api";
import { CustomButton } from "@components/molecules/CustomButton";
import { payBooking } from "@services/directus/rest";
import { useNavigation } from "@react-navigation/native";
import { useQueryState } from "@hooks/useQueryState";

const API_URL = server.baseURL;

export default function StripePay({
  price,
  bookingId,
  style,
  onPaymentSuccess,
}) {
  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();
  const [ready, setReady] = useState(false);
  const [pid, setPid] = useState(null);
  const navigation = useNavigation();
  const { invalidateQuery } = useQueryState();

  const fetchPaymentIntentClientSecret = async () => {
    console.log(bookingId);
    try {
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId, currency: "php" }),
      });
      setPid(clientSecret);
      const { clientSecret, error } = await response.json();
      return { clientSecret, error };
    } catch (e) {
      console.error("Error fetching payment intent:", e);
      return { clientSecret: null, error: e };
    }
  };

  const initializePaymentSheet = async () => {
    const { clientSecret, error } = await fetchPaymentIntentClientSecret();

    if (error || !clientSecret) {
      throw new Error("Check your network connection.");
    }

    const { error: initError } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: "Lingua",
      defaultBillingDetails: {
        address: {
          country: "PH",
        },
      },
    });

    if (initError) {
      throw new Error("Init Error.");
    } else {
      setReady(true);
    }
  };

  const handlePayPress = async () => {
    try {
      await initializePaymentSheet();

      const { error } = await presentPaymentSheet();
      if (error) {
        return;
      }
      await payBooking({ id: bookingId, paymentId: pid });

      // Refresh the booking data after successful payment
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }

      // Invalidate related queries to ensure fresh data across the app
      invalidateQuery("latest-booking");
      invalidateQuery("itinerary-bookings");

      Alert.alert("Success", "Payment Successful", [
        {
          text: "OK",
          onPress: () => navigation.navigate("MainTab", { screen: "Home" }),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <StripeProvider publishableKey="pk_test_51R8ZnKGf6UlwzrtkBAwHrtbXeQDkckp83C9aU7ORThvjYvOkTL2GHONfiihivD1ix3ManQrmzrTvZV4J1Eqg7AMg00pkfxgvCA">
      <CustomButton
        onPress={handlePayPress}
        disabled={!ready}
        style={style || { margin: 16 }}
        primary
      >
        Pay Now
      </CustomButton>
    </StripeProvider>
  );
}
