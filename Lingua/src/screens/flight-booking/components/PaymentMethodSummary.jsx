import { Section } from "@components/atoms/Section"
import StyledSurface from "@components/atoms/StyledSurface"
import { spacing } from "@constants/globalStyles"
import { usePassengerInfoContext } from "@context/PassengerInfoProvider"
import React from "react"
import { Text, useTheme } from "react-native-paper"

export default function PaymentMethodSummary() {
  const { paymentMethod } = usePassengerInfoContext()
  const { colors } = useTheme()

  return (
    <StyledSurface>
      <Section headline={"Payment Method"} sectionStyle={{ gap: spacing.md }}>
        <Text variant="bodyLarge" style={{ color: colors.onBackground }}>
          {paymentMethod}
        </Text>
      </Section>
    </StyledSurface>
  )
}
