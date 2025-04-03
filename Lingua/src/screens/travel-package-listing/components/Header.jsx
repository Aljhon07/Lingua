import PaddedView from "@components/atoms/PaddedView"
import { Text, TextInput, useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { Keyboard, StyleSheet, View } from "react-native"
import { useState } from "react"
import {
  en,
  registerTranslation,
  DatePickerInput,
} from "react-native-paper-dates"
import { useProfileContext } from "@context/ProfileProvider"
import { StatusBar } from "expo-status-bar"
import { Dropdown } from "react-native-paper-dropdown"
import { CustomButton } from "@components/molecules/CustomButton"

export default function Header({ getPackages, countries }) {
  registerTranslation("en", en)
  const { profile } = useProfileContext()

  console.log(countries)
  const [filter, setFilter] = useState({
    date: new Date(Date.now()),
    destination: undefined,
    minBudget: undefined,
    maxBudget: undefined,
  })

  const { colors } = useTheme()
  const styles = createStyles(colors)

  const handleSearch = () => {
    let queries = `filter[price][_gte]=${
      filter.minBudget || 0
    }&filter[price][_lte]=${filter.maxBudget || 999999}`
    Keyboard.dismiss()
    if (filter.destination) {
      queries += `&filter[country][name][_eq]=${filter.destination}`
    }

    console.log("Fikter: ", queries)
    getPackages(queries)
  }
  return (
    <PaddedView style={styles.headerContainer} vertical={spacing.xl}>
      <StatusBar backgroundColor={colors.elevation.level1} style="light" />

      <Text variant="headlineLarge">
        Adventure is calling, {profile.first_name}! Where to go next?
      </Text>

      <View style={styles.wrapper}>
        <Dropdown
          label="Travel to"
          mode="outlined"
          placeholder="Select Destination"
          options={countries}
          value={filter.destination}
          onSelect={(value) =>
            setFilter({
              ...filter,
              destination: value,
            })
          }
        />

        <DatePickerInput
          locale="en"
          mode="outlined"
          label="Departure Date"
          value={filter.date}
          onChange={(value) => setFilter({ ...filter, date: value })}
          inputMode="start"
          validRange={{ startDate: new Date(Date.now()) }}
          presentationStyle="formSheet"
        />

        <View style={styles.budgetRange}>
          <TextInput
            label="Min budget"
            inputMode="numeric"
            mode="outlined"
            value={filter.minBudget}
            onChangeText={(input) => setFilter({ ...filter, minBudget: input })}
            style={{ flex: 1 }}
            left={<TextInput.Affix text="₱ " />}
          />
          <TextInput
            label="Max Budget"
            inputMode="numeric"
            mode="outlined"
            value={filter.maxBudget}
            onChangeText={(input) => setFilter({ ...filter, maxBudget: input })}
            style={{ flex: 1 }}
            left={<TextInput.Affix text="₱ " />}
          />
        </View>
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
      borderBottomLeftRadius: spacing.lg,
      borderBottomRightRadius: spacing.lg,
      gap: spacing.md,
      backgroundColor: colors.elevation.level1,
    },
    budgetRange: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 8,
    },
    wrapper: {
      gap: spacing.xl,
    },
  })
