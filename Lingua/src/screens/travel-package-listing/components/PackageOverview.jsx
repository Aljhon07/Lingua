import { Section } from "@components/atoms/Section"
import { spacing } from "@constants/globalStyles"
import { StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Text, useTheme } from "react-native-paper"

export function PackageOverview({ route }) {
  const { params } = route
  const { data: packageDetails } = params
  const { colors, roundness } = useTheme()
  console.error(packageDetails)
  const styles = createStyles(colors, roundness)
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section headline={"Description"}>
        <Text variant="bodyLarge" style={styles.description}>
          {packageDetails.description}
        </Text>
      </Section>

      <Section headline="Features">
        <View></View>
        <Section headline="Inclusions" headlineVariant="labelLarge">
          <Text variant="bodyLarge" stlye={colors.error}>
            {packageDetails.features.inclusions}
          </Text>
        </Section>

        <Section headline="Exclusions" headlineVariant="labelLarge">
          <Text variant="bodyLarge">{packageDetails.features.exclusions}</Text>
        </Section>
      </Section>
    </ScrollView>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    description: {
      textAlign: "justify",
      alignItems: "center",
      padding: 0,
    },
  })
