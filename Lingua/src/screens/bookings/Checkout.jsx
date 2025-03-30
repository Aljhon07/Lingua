import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { TextInput, Button, Card } from "react-native-paper"

const Checkout = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setDetails((prevDetails) => ({ ...prevDetails, [field]: value }))
  }

  const handleCheckout = () => {
    const { name, email, cardNumber, expiry, cvv } = details
    if (!name || !email || !cardNumber || !expiry || !cvv) {
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
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Full Name"
            value={details.name}
            onChangeText={(value) => handleInputChange("name", value)}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={details.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            label="Card Number"
            value={details.cardNumber}
            onChangeText={(value) => handleInputChange("cardNumber", value)}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Expiry Date (MM/YY)"
            value={details.expiry}
            onChangeText={(value) => handleInputChange("expiry", value)}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="CVV"
            value={details.cvv}
            onChangeText={(value) => handleInputChange("cvv", value)}
            keyboardType="numeric"
            secureTextEntry
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleCheckout}
            loading={loading}
            style={styles.button}
          >
            Checkout
          </Button>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
})

export default CheckoutScreen
