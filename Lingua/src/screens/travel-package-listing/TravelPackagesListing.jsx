import { spacing } from "@constants/globalStyles"
import { StyleSheet, View } from "react-native"
import { getCountries } from "@services/directus/rest"
import { useEffect, useState } from "react"
import { Text } from "react-native-paper"
import { CustomSearchBar } from "@components/atoms/CustomSearchBar"
import { CountryFilterList } from "./components/CountryFilterList"
import { PackageListing } from "./components/PackageListing"

export default function TravelPackagesListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [countries, setCountries] = useState([{ name: "All" }])
  const [filter, setFilter] = useState("All")
  const styles = createStyles()

  console.log(filter)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getCountries()
        setCountries([{ name: "All" }, ...res])
      } catch (error) {}
    }
    fetchCountries()
  }, [filter])

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
          />
          <CountryFilterList
            countries={countries}
            filter={filter}
            setFilter={setFilter}
          />
        </View>
      </View>
      <View style={{ backgroundColor: "red", flex: 1 }}>
        <PackageListing />
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
