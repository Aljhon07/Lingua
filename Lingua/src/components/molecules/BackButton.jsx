import { spacing } from "@constants/globalStyles"
import { useNavigation } from "@react-navigation/native"
import { IconButton, useTheme } from "react-native-paper"

export default function BackButton({ onPress }) {
  const navigation = useNavigation()
  const { colors } = useTheme()

  const handleNavigateBack = () => {
    if (onPress) {
      onPress()
    } else {
      navigation.goBack()
    }
  }
  return (
    <IconButton
      onPress={handleNavigateBack}
      style={{ borderRadius: spacing.md }}
      iconColor={colors.onBackground}
      icon={"chevron-left"}
      size={24}
      mode="contained"
      containerColor={colors.surface
        .replace("rgb", "rgba")
        .replace(")", ", 0.8)")}
    />
  )
}
