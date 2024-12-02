import { Button } from "@components/atoms/Button";
import { useTheme } from "@context/ThemeProvider";

export function PrimaryButton({
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
        backgroundColor: theme.primary,
        ...buttonStyle,
      }}
      textStyle={{ color: "black", ...textStyle }}
      bold={bold}
    >
      {children}
    </Button>
  );
}
