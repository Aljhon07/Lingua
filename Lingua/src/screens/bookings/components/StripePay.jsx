import React, { useEffect, useState } from "react"
import { View, Alert, Button } from "react-native"
import { StripeProvider, usePaymentSheet } from "@stripe/stripe-react-native"
import { domain } from "@constants/api"
import { CustomButton } from "@components/molecules/CustomButton"
import { patchBooking } from "@services/directus/rest"
import { useNavigation } from "@react-navigation/native"

const API_URL = `http://${domain}:5000`

export default function StripePay({ price, bookingId }) {
  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet()
  const [ready, setReady] = useState(false)
  const [pid, setPid] = useState(null)
  const navigation = useNavigation()

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: price,
        }),
      })
      setPid(clientSecret)
      const { clientSecret, error } = await response.json()
      return { clientSecret, error }
    } catch (e) {
      console.error("Error fetching payment intent:", e)
      return { clientSecret: null, error: e }
    }
  }

  const initializePaymentSheet = async () => {
    const { clientSecret, error } = await fetchPaymentIntentClientSecret()

    if (error || !clientSecret) {
      throw new Error("Check your network connection.")
    }

    const { error: initError } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: "Lingua",
      defaultBillingDetails: {
        address: {
          country: "PH",
        },
      },
    })

    if (initError) {
      throw new Error("Init Error.")
    } else {
      setReady(true)
    }
  }

  const handlePayPress = async () => {
    try {
      await initializePaymentSheet()

      const { error } = await presentPaymentSheet()
      if (error) {
        return
      }
      await patchBooking({ id: bookingId, paymentId: pid })
      Alert.alert("Success", "Payment Successful", [
        {
          text: "OK",
          onPress: () => navigation.navigate("MainTab", { screen: "Bookings" }),
        },
      ])
    } catch (error) {
      Alert.alert("Error", error.message)
    }
  }

  return (
    <StripeProvider publishableKey="pk_test_51R8ZnKGf6UlwzrtkBAwHrtbXeQDkckp83C9aU7ORThvjYvOkTL2GHONfiihivD1ix3ManQrmzrTvZV4J1Eqg7AMg00pkfxgvCA">
      <CustomButton onPress={handlePayPress} disabled={!ready} primary>
        Pay Now
      </CustomButton>
    </StripeProvider>
  )
}
