import { spacing } from "@constants/globalStyles"
import { StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTravelPackagesContext } from "@context/TravelPackagesProvider"
import Header from "./components/Header"
import PackageListing from "./components/PackageListing"

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("")
  const { packagesState, getPackages, countries } = useTravelPackagesContext()

  useEffect(() => {
    getPackages("sort=-date_created&limit=5&offset=0")
  }, [])

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        searchQuery={searchQuery}
        getPackages={getPackages}
        styles={styles}
        setSearchQuery={setSearchQuery}
        countries={countries}
      />

      <PackageListing
        packagesState={packagesState}
        getPackages={getPackages}
        headline={"Latest Packages"}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: spacing.lg,
  },
})
