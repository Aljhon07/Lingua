import PaddedView from "@components/atoms/PaddedView"
import { IconButton, Text, TextInput, useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { Keyboard, StyleSheet, View } from "react-native"
import { useState, useEffect } from "react"
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
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [filter, setFilter] = useState({
    date: new Date(Date.now()),
    destination: "Japan",
    minBudget: null,
    maxBudget: null,
  })

  const { colors } = useTheme()
  const styles = createStyles(colors)

  useEffect(() => {
    if (filter.destination) {
      handleSearch()
    } else {
      let queries = `filter[price][_gte]=${
        filter.minBudget || 0
      }&filter[price][_lte]=${filter.maxBudget || 999999}`
      getPackages(queries)
    }
  }, [filter.destination])

  const handleSearch = () => {
    if (!filter.destination) {
      alert("Please select a destination")
      return
    }
    if (filter.minBudget > filter.maxBudget) {
      alert("Minimum budget cannot be greater than maximum budget")
      return
    }
    let queries = `filter[price][_gte]=${
      filter.minBudget || 0
    }&filter[price][_lte]=${filter.maxBudget || 999999}`

    Keyboard.dismiss()
    if (filter.destination) {
      queries += `&filter[country][name][_eq]=${filter.destination}`
    }

    console.log("Filter: ", queries)
    getPackages(queries)
  }
  return (
    <PaddedView style={styles.headerContainer} vertical={spacing.xl}>
      <StatusBar backgroundColor={colors.elevation.level1} style="light" />

      <Text variant="headlineLarge">
        Adventure is calling, {profile.first_name}! Where to go next?
      </Text>

      <View style={styles.wrapper}>
        <View style={styles.countryFilterRow}>
          <View style={styles.countryDropdown}>
            <Dropdown
              label="Travel to"
              mode="outlined"
              placeholder="Select Destination"
              options={countries}
              value={filter.destination}
              onSelect={(value) => {
                setFilter({
                  ...filter,
                  destination: value,
                })
              }}
            />
          </View>

          <IconButton
            icon="filter-variant"
            iconColor={colors.text}
            size={24}
            onPress={() => setIsCollapsed(!isCollapsed)}
            style={styles.filterButton}
            mode="outlined"
          />
        </View>

        {!isCollapsed && (
          <>
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
                value={filter.minBudget?.toString() || ""}
                onChangeText={(input) =>
                  setFilter({
                    ...filter,
                    minBudget: input ? parseInt(input) : null,
                  })
                }
                style={{ flex: 1 }}
                left={<TextInput.Affix text="₱ " />}
              />
              <TextInput
                label="Max Budget"
                inputMode="numeric"
                mode="outlined"
                value={filter.maxBudget?.toString() || ""}
                onChangeText={(input) =>
                  setFilter({
                    ...filter,
                    maxBudget: input ? parseInt(input) : null,
                  })
                }
                style={{ flex: 1 }}
                left={<TextInput.Affix text="₱ " />}
              />
            </View>
          </>
        )}
      </View>
      {!isCollapsed && (
        <CustomButton primary onPress={handleSearch}>
          Search
        </CustomButton>
      )}
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
    countryFilterRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: spacing.sm,
      width: "100%",
    },
    countryDropdown: {
      flex: 1,
    },
    filterButton: {
      marginBottom: spacing.xs,
      borderRadius: spacing.md,
    },
  })
