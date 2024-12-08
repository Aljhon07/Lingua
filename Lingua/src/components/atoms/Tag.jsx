import { View, Text } from "react-native-paper"

export function Tag({ label }) {
  return (
    <View>
      <Text variant="labelLarge">{label}</Text>
    </View>
  )
}
