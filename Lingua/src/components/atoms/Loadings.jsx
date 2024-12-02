import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export function Loading() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
      <Text>Loading</Text>
    </SafeAreaView>
  )
}
