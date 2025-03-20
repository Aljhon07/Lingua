import React from "react"
import { useState } from "react"
import PassengerInput from "./PassengerInput"
import { Section } from "@components/atoms/Section"
import { Divider, IconButton, useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { ScrollView } from "react-native-gesture-handler"
import { View } from "react-native"
import { usePassengerInfoContext } from "@context/PassengerInfoProvider"

export default function PassengerInputContainer() {
  const { colors } = useTheme()
  const { passengers, addPassenger } = usePassengerInfoContext()
  const [focusedIndex, setFocusedIndex] = useState(0)

  return (
    <Section
      headline={"Passengers"}
      contentContainerStyle={{
        gap: spacing.lg,
      }}
      flexValue={0}
      rightComponent={<IconButton icon={"plus"} onPress={addPassenger} />}
    >
      {passengers.map((passenger, index) => {
        return (
          <View key={index}>
            {index > 0 && (
              <Divider
                theme={{ colors: { outlineVariant: colors.primary } }}
                style={{ marginVertical: 5 }}
                bold
              />
            )}
            <PassengerInput
              passenger={passenger}
              focusedIndex={focusedIndex}
              setFocusedIndex={(i) => setFocusedIndex(i)}
              index={index}
            />
          </View>
        )
      })}
    </Section>
  )
}
