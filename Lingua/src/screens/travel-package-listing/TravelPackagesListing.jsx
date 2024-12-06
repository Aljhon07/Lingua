import { spacing } from "@constants/globalStyles"
import { FlatList, StyleSheet, View } from "react-native"
import { getCountries } from "@services/directus/rest"
import { useEffect, useState } from "react"
import { Searchbar, Text, TextInput } from "react-native-paper"
import { CustomButton } from "@components/atoms/CustomButton"

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
          <TextInput
            placeholder="Search"
            inputMode="search"
            mode="outlined"
            left={<TextInput.Icon icon="magnify" />}
            right={
              <TextInput.Icon icon="close" onPress={() => setSearchQuery("")} />
            }
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <Searchbar
            value={searchQuery}
            style={{ maxHeight: 50, marginBottom: 0 }}
          />
          <FlatList
            horizontal={true}
            data={countries}
            renderItem={({ item }) => {
              const isSelected = item.name == filter
              console.log(item.name, isSelected)
              return (
                <CustomButton
                  primary={isSelected}
                  textVariant="titleSmall"
                  onPress={() => setFilter(item.name)}
                >
                  {item.name}
                </CustomButton>
              )
            }}
            extraData={filter}
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
