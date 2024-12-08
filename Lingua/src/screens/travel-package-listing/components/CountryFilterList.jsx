import { CustomButton } from "@components/molecules/CustomButton"
import { fetchCountries } from "@services/directus/rest"
import { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { FlatList } from "react-native-gesture-handler"

export function CountryFilterList({ onPress }) {
  const [filter, setFilter] = useState("All")
  const [countries, setCountries] = useState([{ name: "All" }])
  useEffect(() => {
    const getCountries = async () => {
      try {
        const countriesRes = await fetchCountries()
        setCountries([{ name: "All" }, ...countriesRes])
      } catch (error) {}
    }
    getCountries()
  }, [])

  const handlePress = (country) => {
    setFilter(country)
    onPress(country)
  }
  return (
    <FlatList
      horizontal={true}
      data={countries}
      renderItem={({ item }) => {
        const isSelected = item.name === filter
        console.log(item.name, isSelected)
        return (
          <CustomButton
            primary={isSelected}
            textVariant="labelMedium"
            style={[styles.flatListGap]}
            onPress={() => handlePress(item.name)}
          >
            {item.name}
          </CustomButton>
        )
      }}
      keyExtractor={(item) => item.name}
      extraData={filter}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    marginBottom: 20,
  },
  wrapper: {
    flex: 1,
    padding: 10,
  },
  flatListGap: {
    marginHorizontal: 5,
  },
})
