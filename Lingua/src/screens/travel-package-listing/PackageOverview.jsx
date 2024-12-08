import { Section } from "@components/atoms/Section"
import { Tag } from "@components/atoms/Tag"
import { spacing } from "@constants/globalStyles"
import { StyleSheet } from "react-native"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import { Text, useTheme } from "react-native-paper"

export function PackageOverview({ route }) {
  const { data: packageDetails } = route.params
  const { colors, roundness } = useTheme()

  const styles = createStyles(colors, roundness)
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section headline={"Description"}>
        <Text variant="bodyLarge" style={styles.description}>
          {packageDetails.description}
        </Text>
      </Section>

      <Section
        headline="Features"
        contentContainerStyle={{ backgroundColor: "transparent" }}
      >
        <Tag
          label={`${packageDetails.daysDuration} Days & ${packageDetails.nightsDuration} Nights`}
        />
        <FlatList
          data={packageDetails.features.basic_features}
          renderItem={({ item }) => <Tag label={item} />}
        />
      </Section>
      <Section headline="Inclusions" headlineVariant="labelLarge">
        <Text variant="bodyLarge" stlye={colors.error}>
          {packageDetails.features.inclusions}
        </Text>
      </Section>

      <Section headline="Exclusions" headlineVariant="labelLarge">
        <Text variant="bodyLarge">{packageDetails.features.exclusions}</Text>
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
