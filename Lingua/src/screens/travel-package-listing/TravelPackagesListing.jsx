import { spacing } from "@constants/globalStyles"
import { StyleSheet, View } from "react-native"
import {
  fetchPackages,
  searchPackages,
  fetchProfile,
} from "@services/directus/rest"
import { useEffect, useState } from "react"
import { Text, useTheme } from "react-native-paper"
import { CustomSearchBar } from "@components/atoms/CustomSearchBar"
import { CountryFilterList } from "./components/CountryFilterList"
import { useQueryState } from "@hooks/useQueryState"
import DataContainer from "@components/layouts/DataContainer"
import { Section } from "@components/atoms/Section"
import { SafeAreaView } from "react-native-safe-area-context"
import { PackageCard } from "./components/PackageCard"
import { FlatList, RefreshControl } from "react-native-gesture-handler"
import { useTravelPackagesContext } from "@context/TravelPackagesProvider."

export default function TravelPackagesListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const { getQueryState, executeQuery } = useQueryState()

  const { packagesState, getPackages, searchPackage } =
    useTravelPackagesContext()

  const profileState = getQueryState("profile")

  const { colors } = useTheme()
  const styles = createStyles(colors)

  useEffect(() => {
    getPackages()
    executeQuery("profile", fetchProfile, "?fields=first_name")
  }, [])

  return (
    <DataContainer
      data={profileState.data}
      error={profileState.error}
      loading={profileState.loading && packagesState.loading}
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.headerContainer}>
          <Text variant="headlineLarge">
            Adventure is calling, {profileState?.data?.first_name}! Where to go
            next?
          </Text>
          <View style={styles.wrapper}>
            <CustomSearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSubmitEditing={() => searchPackage(searchQuery)}
              placeholder="Search by keyword..."
              onClearSearch={getPackages}
            />
            <CountryFilterList
              onPress={(selectedFilter) => getPackages(selectedFilter)}
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
            sectionStyle={styles.packageSection}
            contentContainerStyle={styles.section}
          >
            <FlatList
              refreshControl={
                <RefreshControl
                  onRefresh={getPackages}
                  refreshing={packagesState.loading}
                />
              }
              data={packagesState.data}
              renderItem={({ item }) => <PackageCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
            />
          </Section>
        </DataContainer>
      </SafeAreaView>
    </DataContainer>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      marginTop: spacing.xl,
      gap: spacing.lg,
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
    section: {
      backgroundColor: "transparent",
      padding: 0,
    },
  })
