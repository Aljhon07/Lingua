import { LinguaLogo } from "@components/atoms/LinguaLogo"
import { Section } from "@components/atoms/Section"
import StyledSurface from "@components/atoms/StyledSurface"
import { CustomButton } from "@components/molecules/CustomButton"
import { spacing } from "@constants/globalStyles"
import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { DatePickerInput } from "react-native-paper-dates"
import { TextInput } from "react-native-paper"

export default function Checkout() {
  const [details, setDetails] = useState({
    name: "Test",
    cardNumber: 5455590000000009,
    expiry: new Date(Date.now()),
    cvv: "123",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setDetails((prevDetails) => ({ ...prevDetails, [field]: value }))
  }

  const handleCheckout = () => {
    const { name, cardNumber, expiry, cvv } = details
    if (!name || !cardNumber || !expiry || !cvv) {
      alert("Please fill in all details")
      return
    }
    setLoading(true)
    setTimeout(() => {
      alert("Checkout successful!")
      setLoading(false)
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: spacing.xl }}>
        <LinguaLogo light style={{ width: "80%" }} />
      </View>

      <StyledSurface style={styles.card}>
        <Section
          headline={"Card Information"}
          flexValue={0}
          contentContainerStyle={styles.cardInfo}
        >
          <TextInput
            mode="outlined"
            label="Cardholder's Name"
            value={details.name}
            onChangeText={(value) => handleInputChange("name", value)}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Card Number"
            value={details.cardNumber}
            onChangeText={(value) => handleInputChange("cardNumber", value)}
            keyboardType="numeric"
            style={styles.input}
          />

          <View style={styles.rowContainer}>
            <DatePickerInput
              locale="en"
              mode="outlined"
              label="Expiry Date"
              value={details.expiry}
              onChange={(value) => handleInputChange("expiry", value)}
              inputMode="start"
              validRange={{ startDate: new Date() }}
              presentationStyle="formSheet"
              style={[styles.input, styles.expiry]}
            />
            <TextInput
              mode="outlined"
              label="CVV"
              value={details.cvv}
              onChangeText={(value) => handleInputChange("cvv", value)}
              keyboardType="numeric"
              secureTextEntry
              style={[styles.input, styles.cvv]}
            />
          </View>

          <CustomButton primary onPress={handleCheckout}>
            Pay Now
          </CustomButton>
        </Section>
      </StyledSurface>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginHorizontal: spacing.xl,
  },
  cardInfo: {
    gap: spacing.md,
  },
  input: {},
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  expiry: {
    flex: 1,
  },
  cvv: {
    flex: 0.5,
  },
})
