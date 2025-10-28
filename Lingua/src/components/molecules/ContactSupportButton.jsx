import { spacing } from "@constants/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { IconButton, useTheme } from "react-native-paper";

export default function ContactSupportButton({ onPress, icon = "headset" }) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleContactSupport = () => {
    if (onPress) {
      onPress();
    } else {
      // Default behavior - navigate to ContactSupport
      navigation.navigate("ContactSupport");
    }
  };

  return (
    <IconButton
      onPress={handleContactSupport}
      style={{ borderRadius: spacing.md }}
      iconColor={colors.onBackground}
      icon={icon}
      size={24}
      mode="contained"
      containerColor={colors.surface
        .replace("rgb", "rgba")
        .replace(")", ", 0.8)")}
    />
  );
}
