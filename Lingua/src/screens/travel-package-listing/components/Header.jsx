import PaddedView from "@components/atoms/PaddedView"
import { useTravelPackagesContext } from "@context/TravelPackagesProvider"
import { Button, Text, TextInput, useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { StyleSheet, View } from "react-native"
import { useEffect, useState } from "react"
import {
  en,
  registerTranslation,
  DatePickerInput,
} from "react-native-paper-dates"
import { useProfileContext } from "@context/ProfileProvider"
import { StatusBar } from "expo-status-bar"
import { Dropdown } from "react-native-paper-dropdown"
import { CustomButton } from "@components/molecules/CustomButton"

export default function Header({ getPackages }) {
  useEffect(() => {
    StatusBar.setBar
  })

  registerTranslation("en", en)
  const { profile } = useProfileContext()
  const { countries } = useTravelPackagesContext()

  const [date, setDate] = useState(new Date(Date.now()))
  const [destination, setDestination] = useState("")

  const { colors } = useTheme()
  const styles = createStyles(colors)

  const handleSearch = () => {
    getPackages(`filter[country][name][_eq]=${destination}`)
  }
  return (
    <PaddedView style={styles.headerContainer} vertical={spacing.xl}>
      <StatusBar backgroundColor={colors.elevation.level1} style="light" />

      <Text variant="headlineMedium">
        Adventure is calling, {profile.first_name}! Where to go next?
      </Text>

      <View style={{ width: "100%" }}>
        <Dropdown
          label="Travel to"
          placeholder="Select Destination"
          options={countries}
          value={destination}
          onSelect={setDestination}
          hideMenuHeader
        />
      </View>

      <View>
        <DatePickerInput
          locale="en"
          label="Departure Date"
          value={date}
          onChange={(d) => setDate(d)}
          inputMode="start"
          validRange={{ startDate: new Date(Date.now()) }}
          presentationStyle="formSheet"
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <TextInput
          label="Min budget"
          inputMode="numeric"
          mode="flat"
          style={{ flex: 1 }}
          left={<TextInput.Affix text="₱ " />}
        />
        <TextInput
          label="Max Budget"
          inputMode="numeric"
          mode="flat"
          style={{ flex: 1 }}
          left={<TextInput.Affix text="₱ " />}
        />
      </View>
      <CustomButton primary onPress={handleSearch}>
        Search
      </CustomButton>
    </PaddedView>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    headerContainer: {
      gap: spacing.xl,
      backgroundColor: colors.elevation.level1,
      borderBottomLeftRadius: spacing.lg,
      borderBottomRightRadius: spacing.lg,
      elevation: 10,
      shadowColor: "white",
    },
    wrapper: {
      gap: spacing.md,
    },
  })
