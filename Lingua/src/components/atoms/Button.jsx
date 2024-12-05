import { Paragraph, SubHeadings } from "@components/atoms/Typography"
import { Pressable } from "react-native"
import { useThemeContext } from "@context/ThemeProvider"
import { border } from "@constants/globalStyles"

export function Button({
  children,
  onPress,
  textStyle,
  buttonStyle,
  bold = true,
}) {
  const { colors } = useThemeContext()
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
        style={[{ color: colors.text, textAlign: "center" }, textStyle]}
        bold={bold}
      >
        {children}
      </Paragraph>
    </Pressable>
  )
}
