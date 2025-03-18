import { spacing } from "@constants/globalStyles"
import { StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTravelPackagesContext } from "@context/TravelPackagesProvider"
import Header from "./components/Header"
import PackageListing from "./components/PackageListing"

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("")
  const { packages, packagesState, getPackages } = useTravelPackagesContext()

  console.log("Package Listing: " + packages)

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
