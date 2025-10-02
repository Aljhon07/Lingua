import { View, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { CustomButton } from "@components/molecules/CustomButton";
import { spacing } from "@constants/globalStyles";

export default function ProfileActions({ onLogoutPress }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.logoutContainer}>
      <Button
        mode="contained"
        style={styles.logOutButton}
        textStyle={styles.logOutText}
        onPress={onLogoutPress}
        icon="logout"
      >
        Log Out
      </Button>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    logoutContainer: {
      marginTop: spacing.xl,
      paddingTop: spacing.xl,
    },
    logOutButton: {
      backgroundColor: colors.errorContainer,
    },
    logOutText: {
      color: colors.onErrorContainer,
    },
  });
