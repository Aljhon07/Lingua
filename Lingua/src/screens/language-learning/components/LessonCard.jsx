import { spacing } from "@constants/globalStyles"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet } from "react-native"
import { Text, TouchableRipple, useTheme } from "react-native-paper"

export function LessonCard({ title, id, description }) {
  const navigation = useNavigation()
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)

  const handleNavigation = () => {
    navigation.navigate("VocabularyList", { id })
  }
  return (
    <TouchableRipple style={styles.container} onPress={handleNavigation}>
      <>
        <Text variant="titleLarge">{title}</Text>
        <Text>{description}</Text>
      </>
    </TouchableRipple>
  )
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
    },
  })
