import { spacing } from "@constants/globalStyles"
import { StyleSheet, View } from "react-native"
import {
  fetchPackages,
  searchPackages,
  fetchPackageByCountry,
} from "@services/directus/rest"
import { useEffect, useState } from "react"
import { Text, useTheme } from "react-native-paper"
import { CustomSearchBar } from "@components/atoms/CustomSearchBar"
import { CountryFilterList } from "./components/CountryFilterList"
import { PackageListing } from "./components/PackageListing"
import { useQueryState } from "@hooks/useQueryState"
import DataContainer from "@components/layouts/DataContainer"
import { Section } from "@components/atoms/Section"

export default function TravelPackagesListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const { getQueryState, executeQuery } = useQueryState()
  const { colors } = useTheme()
  const packagesState = getQueryState("packages")
  const styles = createStyles(colors)

  useEffect(() => {
    executeQuery("packages", fetchPackages)
  }, [])

  const searchPackage = async () => {
    executeQuery("packages", searchPackages, searchQuery)
  }
  const getPackagesByCountry = async (selectedFilter) => {
    if (selectedFilter === "All") {
      executeQuery("packages", fetchPackages)
    } else {
      executeQuery("packages", fetchPackageByCountry, selectedFilter)
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text variant="headlineLarge">
          Adventure is calling, [Username]! Where to go next?
        </Text>
        <View style={styles.wrapper}>
          <CustomSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSubmitEditing={searchPackage}
            placeholder="Search by keyword..."
          />
          <CountryFilterList
            onPress={(selectedFilter) => getPackagesByCountry(selectedFilter)}
          />
        </View>
      </View>
      {/* Track: Removed View Component */}
      <DataContainer
        error={packagesState.error}
        loading={packagesState.loading}
        errorMessage={"Failed to fetch packages"}
        noDataComponent="No Packages Available!"
        data={packagesState.data}
      >
        <Section
          headline={"Packages"}
          headlineVariant="headlineLarge"
          sectionStyle={styles.section}
          contentContainerStyle={styles.packageSection}
        >
          <PackageListing horizontal packages={packagesState.data} />
        </Section>
      </DataContainer>
    </View>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      marginTop: spacing.xxl,
      gap: spacing.xl,
    },
    packageContainer: {
      flex: 1,
    },
    wrapper: {
      gap: spacing.md,
    },
    headerContainer: {
      gap: spacing.xl,
    },
    flatListGap: {
      marginRight: spacing.sm,
    },
    optionButtons: {
      padding: spacing.sm,
      marginHorizontal: spacing.sm,
    },
    packageSection: {
      backgroundColor: "transparent",
      padidng: spacing.md,
    },
  })
