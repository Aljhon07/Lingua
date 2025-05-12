import { CustomButton } from "@components/molecules/CustomButton";
import { Icon, Text } from "react-native-paper";

export default function Phrase({ english, translation }) {
  return (
    <CustomButton
      style={{ alignItems: "flex-start", flexDirection: "row" }}
      icon="volume-high"
    >
      <Text variant="labelLarge">{english}</Text>
      <Text variant="bodyMedium">{translation}</Text>
    </CustomButton>
  );
}
