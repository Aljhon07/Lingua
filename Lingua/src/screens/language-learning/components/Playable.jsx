import { spacing } from "@constants/globalStyles"
import { View } from "react-native"
import { Icon, TouchableRipple } from "react-native-paper"

export default function Playable({ children, playSound, isPlaying }) {
  return (
    <TouchableRipple
      icon={"volume-source"}
      iconSize={32}
      style={{
        width: "auto",
        alignSelf: "flex-start",
        borderWidth: 0,
        borderBottomWidth: 1,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
      }}
      onPress={playSound}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.md,
        }}
      >
        <Icon source={isPlaying ? "volume-high" : "volume-off"} size={32} />
        {children}
      </View>
    </TouchableRipple>
  )
}
