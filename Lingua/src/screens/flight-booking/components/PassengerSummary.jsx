import { Section } from "@components/atoms/Section"
import StyledSurface from "@components/atoms/StyledSurface"
import { spacing } from "@constants/globalStyles"
import React from "react"
import { Text, useTheme } from "react-native-paper"

export default function PassengerSummary({ passengers }) {
  const { colors } = useTheme()
  return (
    <StyledSurface>
      <Section
        headline={"Passengers"}
        flexValue={0}
        sectionStyle={{
          gap: spacing.md,
        }}
        contentContainerStyle={{
          gap: spacing.lg,
        }}
      >
        {passengers.map((passenger, index) => {
          return (
            <Text
              variant="bodyLarge"
              style={{ color: colors.onSurface }}
              key={index}
            >
              {passenger.name}
            </Text>
          )
        })}
      </Section>
    </StyledSurface>
  )
}
