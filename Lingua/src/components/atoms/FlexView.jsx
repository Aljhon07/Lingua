const { View } = require("react-native");
const { SafeAreaView } = require("react-native-safe-area-context");
import { StyleSheet } from "react-native";

export default function FlexView({ children, style }) {
  return <View style={[styles.flex, style]}>{children}</View>;
}

export function FlexSafeAreaView({ children, style }) {
  return <SafeAreaView style={[styles.flex, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
