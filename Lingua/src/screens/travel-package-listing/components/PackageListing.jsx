import { directus } from "@constants/api"
import { StyleSheet, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Button, Card, Text } from "react-native-paper"

export function PackageListing({ packages }) {
  const renderPackage = ({ item }) => {
    const imageUrl = `${directus.baseURL}/assets/${item.cover}`
    console.log("Image URL:", imageUrl)

    return (
      <Card style={styles.card}>
        <Card.Cover
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1683758342945-e0e47a14a66d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
        <Card.Content>
          <Text variant="titleLarge">{item.name}</Text>
          <Text variant="bodyMedium">Country: {item.country}</Text>
          <Text variant="bodyMedium">Price: ${item.price}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => console.log(`Selected package: ${item.name}`)}>
            Select
          </Button>
        </Card.Actions>
      </Card>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={packages}
        renderItem={renderPackage}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
})
