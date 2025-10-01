import { Text } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import PaddedView from "@components/atoms/PaddedView";

export default function PackageTips({ route }) {
  const { data: packageDetails } = route.params;
  console.log(
    "PackageDetails in PackageTips:",
    JSON.stringify(packageDetails.features, null, 2)
  );

  const [tips, setTips] = useState(
    packageDetails.features.cultural_tips
      ? packageDetails.features.cultural_tips.split("\n")
      : ["No Cultural Tips Available"]
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PaddedView vertical={16}>
        {tips.map((tip, index) => (
          <Text key={index} style={{ marginBottom: 8 }}>
            {index + 1}. {tip}
          </Text>
        ))}
      </PaddedView>
    </ScrollView>
  );
}
