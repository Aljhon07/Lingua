import { StyleSheet, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { PackageCard } from "./PackageCard"

export function PackageListing({ packages }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={packages}
        renderItem={({ item }) => <PackageCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
