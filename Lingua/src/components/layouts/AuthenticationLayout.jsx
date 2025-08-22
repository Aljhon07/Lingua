import { LinguaLogo } from "@components/atoms/LinguaLogo";
import { border, spacing } from "@constants/globalStyles";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function AuthenticationForm({ children }) {
  const bg_1 = require("@assets/images/background_1.jpg");
  const bg_2 = require("@assets/images/background_2.jpg");
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor=""></StatusBar>
      <LinguaLogo light={true} style={styles.logo} />
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xxl,
    flex: 1,
  },
  container: {
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: border.md,
    width: "100%",
  },

  logo: {
    width: "80%",
    alignSelf: "center",
  },
});
