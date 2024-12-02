import { Paragraph, SubHeadings } from "@components/atoms/Typography";
import { Pressable } from "react-native";
import { useTheme } from "@context/ThemeProvider";
import { border } from "@constants/globalStyles";

export function Button({
  children,
  onPress,
  textStyle,
  buttonStyle,
  bold = true,
}) {
  const { theme } = useTheme();
  return (
    <Pressable
      style={[
        {
          flex: 1,
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: border.md,
        },
        buttonStyle,
      ]}
      onPress={onPress}
    >
      <Paragraph
        style={[{ color: theme.text, textAlign: "center" }, textStyle]}
        bold={bold}
      >
        {children}
      </Paragraph>
    </Pressable>
  );
}
