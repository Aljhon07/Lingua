import { Section } from "@components/atoms/Section"
import { usePassengerInfoContext } from "@context/PassengerInfoProvider"
import React from "react"
import { Dropdown } from "react-native-paper-dropdown"

export default function PaymentMethodInput() {
  const { paymentMethod, handleChangePaymentMethod } = usePassengerInfoContext()
  return (
    <Section headline={"Payment Method"}>
      <Dropdown
        mode="outlined"
        placeholder="Payment Method"
        value={paymentMethod}
        onSelect={(value) => handleChangePaymentMethod(value)}
        options={[
          { label: "Debit Card", value: "Debit Card" },
          { label: "Credit Card", value: "Credit Card" },
        ]}
      />
    </Section>
  )
}
