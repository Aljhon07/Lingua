import { spacing } from "@constants/globalStyles"
import { StyleSheet, View } from "react-native"
import {
  fetchPackages,
  searchPackages,
  fetchPackageByCountry,
} from "@services/directus/rest"
import { useEffect, useState } from "react"
import { Text } from "react-native-paper"
import { CustomSearchBar } from "@components/atoms/CustomSearchBar"
import { CountryFilterList } from "./components/CountryFilterList"
import { PackageListing } from "./components/PackageListing"
import { useQueryState } from "@hooks/useQueryState"
import DataContainer from "@components/layouts/DataContainer"

export default function TravelPackagesListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const { getQueryState, executeQuery } = useQueryState()

  const packagesState = getQueryState("packages")
  const styles = createStyles()

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
          Where Will Your{"\n"}Next Adventure Take You?
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
      <View style={styles.packageContainer}>
        <DataContainer
          error={packagesState.error}
          loading={packagesState.loading}
          errorMessage={"Failed to fetch packages"}
          noDataMessage="No Packages Available!"
          data={packagesState.data}
        >
          <PackageListing packages={packagesState.data} />
        </DataContainer>
      </View>
    </View>
  )
}

const createStyles = () =>
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
      padding: 2,
      marginHorizontal: 5,
    },
  })
