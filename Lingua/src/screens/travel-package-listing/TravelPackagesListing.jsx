import { Headings2 } from "@components/atoms/Typography"
import { SearchBar } from "@components/molecules/SearchBar"
import { spacing } from "@constants/globalStyles"
import { FlatList, StyleSheet, View } from "react-native"
import { flags } from "@constants/flags"
import { IconButton } from "@components/molecules/buttons/IconButton"
import { getCountries } from "@services/directus/rest"
import { useEffect, useState } from "react"

export default function TravelPackagesListing() {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await getCountries()
        setCountries(countries)
      } catch (error) {
        setCountries([])
      }
    }
    fetchCountries()
  }, [])
  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Headings2>Where Will Your{"\n"}Next Adventure Take You?</Headings2>
        <View style={styles.wrapper}>
          <SearchBar />
          <FlatList
            horizontal={true}
            data={flags}
            renderItem={({ item }) => (
              <IconButton image={item.image} country={item.name} />
            )}
            keyExtractor={(item) => item.name}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xxl,
  },
  wrapper: {
    gap: spacing.md,
  },
  headerContainer: {
    gap: spacing.xl,
  },
})
