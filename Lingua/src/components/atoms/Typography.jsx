import { useTheme } from "@context/ThemeProvider";
import { useFontContext } from "@context/FontProvider";
import { Pressable, Text } from "react-native";
import { fontSize } from "@constants/globalStyles";

export function Paragraph({ children, style, bold = false, center }) {
  const { theme } = useTheme();
  const { fonts } = useFontContext();
  return (
    <Text
      style={[
        {
          color: theme.text,
          fontSize: fontSize.base,
          fontFamily: bold ? fonts.MerriweatherBold : fonts.CrimsonTextRegular,
          textAlign: center ? "center" : "left",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
export function SubText({ children, style, bold = false, center = false }) {
  return (
    <Paragraph style={style} bold={bold} center={false}>
      {children}
    </Paragraph>
  );
}
export function LinkText({
  children,
  style,
  bold = false,
  center = false,
  onPress,
}) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paragraph
        style={[{ color: theme.link }, style]}
        bold={bold}
        center={center}
      >
        {children}
      </Paragraph>
    </Pressable>
  );
}

export function SubHeadings({ children, style, bold = true }) {
  const { theme } = useTheme();
  const { fonts } = useFontContext();
  return (
    <Text
      style={[
        {
          color: theme.textHeadings,
          fontSize: fontSize.md,
          fontFamily: bold ? fonts.MerriweatherBold : fonts.MerriweatherRegular,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function Headings3({ children, style }) {
  const { theme } = useTheme();
  const { fonts } = useFontContext();
  return (
    <Text
      style={[
        {
          color: theme.text,
          fontSize: fontSize.lg,
          fontFamily: fonts.MerriweatherBold,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
