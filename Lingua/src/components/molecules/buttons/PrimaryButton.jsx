import { Button } from "@components/atoms/Button"
import { useThemeContext } from "@context/ThemeProvider"

export function PrimaryButton({
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
        backgroundColor: colors.primary,
        ...buttonStyle,
      }}
      textStyle={{ color: colors.inverted, ...textStyle }}
      bold={bold}
    >
      {children}
    </Button>
  )
}
