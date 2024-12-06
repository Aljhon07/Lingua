import { CustomButton } from "@components/atoms/CustomButton"
import { StyleSheet } from "react-native"
import { FlatList } from "react-native-gesture-handler"

export function CountryFilterList({ countries, filter, setFilter }) {
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
            onPress={() => setFilter(item.name)}
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
