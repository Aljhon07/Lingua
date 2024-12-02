import { NavigationContainer } from "@react-navigation/native"
import RootNavigator from "@navigation/RootNavigator"
import ThemedView from "@components/atoms/ThemedView"

export default function ThemedApp() {
  return (
    <ThemedView>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemedView>
  )
}
