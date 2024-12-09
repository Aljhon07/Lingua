import { spacing } from "@constants/globalStyles"
import { StyleSheet, View } from "react-native"
import {
  fetchPackages,
  searchPackages,
  fetchPackageByCountry,
  fetchProfile,
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
  const profileState = getQueryState("profile")
  const recentBookings = getQueryState("bookings")
  const styles = createStyles(colors)

  useEffect(() => {
    executeQuery("packages", fetchPackages)
    executeQuery("profile", fetchProfile, "?fields=first_name")
    console.error(profileState.data)
  }, [])

  const searchPackage = () => {
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
    <DataContainer
      data={profileState.data}
      error={profileState.error}
      loading={profileState.loading && packagesState.loading}
    >
      <View style={styles.screen}>
        <View style={styles.headerContainer}>
          <Text variant="headlineLarge">
            Adventure is calling, {profileState?.data?.first_name}! Where to go
            next?
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
    </DataContainer>
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
      padding: 0,
    },
  })
