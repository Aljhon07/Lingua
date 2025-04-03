import { useThemeContext } from "@context/ThemeProvider"
import { SegmentedButtons } from "react-native-paper"

export function ThemeSelector() {
  const { themePreference, setThemePreference } = useThemeContext()

  return (
    <SegmentedButtons
      value={themePreference}
      onValueChange={setThemePreference}
      buttons={[
        {
          value: "light",
          label: "Light",
        },
        {
          value: "automatic",
          label: "Automatic",
        },
        { value: "dark", label: "Dark" },
      ]}
    />
  )
}
