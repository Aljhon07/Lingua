import { SubText } from "@components/atoms/Typography"
import { border, spacing } from "@constants/globalStyles"
import { useThemeContext } from "@context/ThemeProvider"
import { Pressable, Image, StyleSheet } from "react-native"

export function IconButton({ image, country, style }) {
  const { colors } = useThemeContext()
  return (
    <Pressable
      style={[
        styles.container,
        { shadowColor: colors.primary, backgroundColor: colors.background },
        style,
      ]}
    >
      <Image source={image} style={styles.image} />
      <SubText style={styles.subText}>{country}</SubText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
    alignItems: "center",
    marginHorizontal: spacing.md,
    elevation: 10,
    borderRadius: border.md,
    overflow: "hidden",
  },
  image: {
    backgroundColor: "green",
    resizeMode: "contain",
  },
  subText: {
    textTransform: "capitalize",
  },
})
