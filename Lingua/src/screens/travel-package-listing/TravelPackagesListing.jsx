import { Headings2, Paragraph } from "@components/atoms/Typography"
import { SearchBar } from "@components/molecules/SearchBar"
import { spacing } from "@constants/globalStyles"
import { FlatList, StyleSheet, View } from "react-native"
import { flags } from "@constants/flags"
import { IconButton } from "@components/molecules/buttons/IconButton"

export default function TravelPackagesListing() {
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
              <IconButton image={item.image} country={item.name} i />
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
