import { spacing } from "@constants/globalStyles"
import { FlatList, StyleSheet, View } from "react-native"
import { getCountries } from "@services/directus/rest"
import { useEffect, useState } from "react"
import { Button, Searchbar, Text } from "react-native-paper"

export default function TravelPackagesListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [countries, setCountries] = useState([{ name: "All" }])
  const [filter, setFilter] = useState("All")
  console.log(filter)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getCountries()
        setCountries([{ name: "All" }, ...res])
      } catch (error) {}
    }
    fetchCountries()
  }, [])
  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text variant="headlineLarge">
          Where Will Your{"\n"}Next Adventure Take You?
        </Text>
        <View style={styles.wrapper}>
          <Searchbar
            inputStyle={{}}
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <FlatList
            horizontal={true}
            data={countries}
            renderItem={({ item }) => {
              const isSelected = item.name === filter
              console.log(item.name, isSelected)
              return (
                <Button
                  mode={isSelected ? "contained" : "outlined"}
                  onPress={() => setFilter(item.name)}
                >
                  {item.name}
                </Button>
              )
            }}
            keyExtractor={(item, index) => item + index.toString()}
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
  optionButtons: {
    padding: 2,
    marginHorizontal: 5,
  },
})
