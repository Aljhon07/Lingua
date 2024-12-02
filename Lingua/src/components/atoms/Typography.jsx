import { useThemeContext } from "@context/ThemeProvider"
import { useFontContext } from "@context/FontProvider"
import { Pressable, Text } from "react-native"
import { fontSize } from "@constants/globalStyles"

export function Paragraph({ children, style, bold = false, center }) {
  const { colors } = useThemeContext()
  const { fonts } = useFontContext()
  return (
    <Text
      style={[
        {
          color: colors.text,
          fontSize: fontSize.base,
          fontFamily: bold ? fonts.MerriweatherBold : fonts.CrimsonTextRegular,
          textAlign: center ? "center" : "left",
        },
        style,
      ]}
    >
      {children}
    </Text>
  )
}
export function SubText({ children, style, bold = false, center = false }) {
  return (
    <Paragraph
      style={{ ...style, fontSize: fontSize.sm }}
      bold={bold}
      center={false}
    >
      {children}
    </Paragraph>
  )
}
export function LinkText({
  children,
  style,
  bold = false,
  center = false,
  onPress,
}) {
  const { colors } = useThemeContext()

  return (
    <Pressable
      onPress={onPress}
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paragraph
        style={[{ color: colors.link }, style]}
        bold={bold}
        center={center}
      >
        {children}
      </Paragraph>
    </Pressable>
  )
}

export function SubHeadings({ children, style, bold = true }) {
  const { colors } = useThemeContext()
  const { fonts } = useFontContext()
  return (
    <Text
      style={[
        {
          color: colors.textHeadings,
          fontSize: fontSize.md,
          fontFamily: bold ? fonts.MerriweatherBold : fonts.MerriweatherRegular,
        },
        style,
      ]}
    >
      {children}
    </Text>
  )
}

export function Headings({ children, style }) {
  const { colors } = useThemeContext()
  const { fonts } = useFontContext()
  return (
    <Text
      style={[
        {
          color: colors.text,
          fontSize: fontSize.xl,
          fontFamily: fonts.MerriweatherBold,
        },
        style,
      ]}
    >
      {children}
    </Text>
  )
}

export function Headings2({ children, style }) {
  return <Headings style={{ ...style, fontSize: 34 }}>{children}</Headings>
}
