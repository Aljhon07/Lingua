import { Section } from "@components/atoms/Section"
import StyledSurface from "@components/atoms/StyledSurface"
import { spacing } from "@constants/globalStyles"
import React from "react"
import { Text, useTheme } from "react-native-paper"

export default function PaymentMethodSummary({ paymentMethod }) {
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
