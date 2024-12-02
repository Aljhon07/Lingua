import { Button } from "@components/atoms/Button"
import { useThemeContext } from "@context/ThemeProvider"

export function SecondaryButton({
  children,
  onPress,
  textStyle,
  buttonStyle,
  bold,
}) {
  const { colors } = useThemeContext()
  return (
    <Button
      onPress={onPress}
      buttonStyle={{
        backgroundColor: "transparent",
        borderColor: "white",
        borderWidth: 1,
        ...buttonStyle,
      }}
      textStyle={{ color: colors.primary, ...textStyle }}
      bold={bold}
    >
      {children}
    </Button>
  )
}
