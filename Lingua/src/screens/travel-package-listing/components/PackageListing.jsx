import { StyleSheet, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { PackageCard } from "./PackageCard"

export function PackageListing({ packages, containerStyle, horizontal }) {
  return (
    <View style={[styles.container, containerStyle]}>
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
