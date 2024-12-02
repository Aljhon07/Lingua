import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import RootNavigator from "@navigation/RootNavigator"
import { useThemeContext } from "@context/ThemeProvider"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ThemedApp() {
  const { colors } = useThemeContext()

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
    },
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer theme={MyTheme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaView>
  )
}
