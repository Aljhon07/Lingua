import { Section } from "@components/atoms/Section"
import { spacing } from "@constants/globalStyles"
import { usePassengerInfoContext } from "@context/PassengerInfoProvider"
import React from "react"
import { TextInput } from "react-native-paper"

export default function ContactInput() {
  const { contacts, handleChangeContacts } = usePassengerInfoContext()
  return (
    <Section
      flexValue={0}
      headline="Contacts"
      disabled
      contentContainerStyle={{ gap: spacing.md }}
    >
      <TextInput
        mode="outlined"
        label={"Phone Number"}
        placeholder="User phone number"
        value={contacts.phoneNumber}
        onChangeText={(value) => handleChangeContacts("phoneNumber", value)}
        autoComplete="tel"
      />
      <TextInput
        mode="outlined"
        label={"Email Address"}
        placeholder="User email address"
        value={contacts.emailAddress}
        autoComplete="email"
        onChangeText={(value) => handleChangeContacts("emailAddress", value)}
      />
    </Section>
  )
}
