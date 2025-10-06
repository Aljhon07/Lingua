import DataContainer from "@components/layouts/DataContainer";
import { spacing } from "@constants/globalStyles";
import { useUserProgressContext } from "@context/UserProgressProvider";
import { useQueryState } from "@hooks/useQueryState";
import { useNavigation } from "@react-navigation/native";
import { fetchUserProgress } from "@services/directus/rest";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { id } from "react-native-paper-dates";

export function LessonCard({
  title,
  id: lessonId,
  description,
  selectedLanguage,
}) {
  const navigation = useNavigation();
  const { colors, roundness } = useTheme();

  const { findUserProgressByLessonId, userProgress } = useUserProgressContext();
  const styles = createStyles(colors, roundness);

  console.log("User: ", lessonId, findUserProgressByLessonId(lessonId));
  const handleNavigation = () => {
    navigation.navigate("LessonVocabs", {
      id: lessonId,
      title: title + " - " + selectedLanguage.name,
    });
  };

  return (
    <TouchableRipple style={styles.container} onPress={handleNavigation}>
      <View style={{ display: "flex", gap: spacing.sm }}>
        <View>
          <Text variant="titleLarge" style={styles.title}>
            {title}
          </Text>
          <Text>{description}</Text>
        </View>
        <Text variant="labelLarge" style={{ textAlign: "right" }}>
          {findUserProgressByLessonId(lessonId)?.recent_score != undefined
            ? `Last Score: ${
                findUserProgressByLessonId(lessonId)?.recent_score
              }%`
            : "Not Started Yet"}
        </Text>
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
