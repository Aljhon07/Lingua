import { View } from "react-native"
import { IconButton, TextInput } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { usePassengerInfoContext } from "@context/PassengerInfoProvider"
import ImageUpload from "./ImageUpload"

export default function PassengerInput({
  index,
  focusedIndex,
  setFocusedIndex,
}) {
  const { updateInfo, passengers } = usePassengerInfoContext()
  const { name } = passengers[index]
  console.log(focusedIndex)

  return (
    <View
      style={{
        gap: spacing.sm,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          mode="outlined"
          label={"Passenger Full Name"}
          value={name}
          style={{ flex: 1 }}
          onChangeText={(value) => updateInfo(index, "name", value)}
          onFocus={() => setFocusedIndex(index)}
        />
      </View>
      <ImageUpload index={index} focusedIndex={focusedIndex} />
    </View>
  )
}
