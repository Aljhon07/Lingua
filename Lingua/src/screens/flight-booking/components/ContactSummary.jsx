import { Section } from "@components/atoms/Section"
import StyledSurface from "@components/atoms/StyledSurface"
import { spacing } from "@constants/globalStyles"
import { usePassengerInfoContext } from "@context/PassengerInfoProvider"
import React from "react"
import { Text, useTheme } from "react-native-paper"
export default function ContactSummary({ contactInfo }) {
  const { colors } = useTheme()
  return (
    <StyledSurface>
      <Section
        headline={"Contacts"}
        sectionStyle={{
          gap: spacing.md,
        }}
        contentContainerStyle={{
          gap: spacing.lg,
        }}
      >
        <Text variant="bodyLarge" style={{ color: colors.onBackground }}>
          {contactInfo.emailAddress}
        </Text>
        <Text variant="bodyLarge" style={{ color: colors.onBackground }}>
          {contactInfo.phoneNumber}
        </Text>
      </Section>
    </StyledSurface>
  )
}
