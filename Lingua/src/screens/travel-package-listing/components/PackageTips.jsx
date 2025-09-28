import { Text } from "react-native-paper"
import { View } from "react-native"
import { useState } from "react"

export default function PackageTips({ route }) {
  const { data: packageDetails } = route.params
  console.log(
    "PackageDetails in PackageTips:",
    JSON.stringify(packageDetails.features, null, 2)
  )
  const [tips, setTips] = useState(
    packageDetails.features.cultural_tips || "No Cultural Tips Available"
  )
  return (
    <View style={{ padding: 16 }}>
      <Text variant="bodyLarge">{tips}</Text>
    </View>
  )
}
