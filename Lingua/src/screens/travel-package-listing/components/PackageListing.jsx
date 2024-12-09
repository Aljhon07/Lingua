import { StyleSheet, View } from "react-native"
import { FlatList, RefreshControl } from "react-native-gesture-handler"
import { PackageCard } from "./PackageCard"

export function PackageListing({
  packages,
  containerStyle,
  horizontal,
  onRefresh,
  refreshing,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
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
