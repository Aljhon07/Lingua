import { spacing } from "@constants/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";

export function LessonCard({ title, id, description, selectedLanguage }) {
  const navigation = useNavigation();
  const { colors, roundness } = useTheme();
  const styles = createStyles(colors, roundness);

  const handleNavigation = () => {
    navigation.navigate("LessonVocabs", {
      id,
      title: title + " - " + selectedLanguage.name,
    });
  };
  return (
    <TouchableRipple style={styles.container} onPress={handleNavigation}>
      <View>
        <Text variant="titleLarge" style={styles.title}>
          {title}
        </Text>
        <Text>{description}</Text>
      </View>
    </TouchableRipple>
  );
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    container: {
      flex: 1,
      borderRadius: roundness,
      backgroundColor: colors.surfaceVariant,
      borderWidth: 1,
      borderColor: colors.onPrimary,
      alignItems: "center",
      padding: spacing.lg,
      marginVertical: spacing.md,
    },
    title: {
      textAlign: "center",
      marginBottom: spacing.md,
    },
  });
