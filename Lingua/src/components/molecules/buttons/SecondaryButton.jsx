import { Button } from "@components/atoms/Button";
import { useTheme } from "@context/ThemeProvider";

export function SecondaryButton({
  children,
  onPress,
  textStyle,
  buttonStyle,
  bold,
}) {
  const { theme } = useTheme();
  return (
    <Button
      onPress={onPress}
      buttonStyle={{
        backgroundColor: "transparent",
        borderColor: "white",
        borderWidth: 1,
        ...buttonStyle,
      }}
      textStyle={{ color: theme.primary, ...textStyle }}
      bold={bold}
    >
      {children}
    </Button>
  );
}
