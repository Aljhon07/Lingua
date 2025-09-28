import { Section } from "@components/atoms/Section"
import { spacing } from "@constants/globalStyles"
import { CustomTag } from "@components/atoms/CustomTag"
import { StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Text, useTheme } from "react-native-paper"
import PaddedView from "@components/atoms/PaddedView"

export function PackageOverview({ route }) {
  const { data: packageDetails } = route.params
  const { colors, roundness } = useTheme()

  const styles = createStyles(colors, roundness)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PaddedView vertical={spacing.lg} style={styles.wrapper}>
        <View style={styles.tagContainer}>
          {packageDetails.features.basic_features.length > 0 &&
            packageDetails.features.basic_features.map((feature) => (
              <CustomTag
                key={feature}
                label={feature}
                style={{
                  marginRight: spacing.md,
                  marginBottom: spacing.md,
                }}
              />
            ))}
        </View>

        <Section headline="Description" headlineVariant="titleMedium">
          <Text variant="bodyLarge" style={styles.text}>
            {packageDetails.description}
          </Text>
        </Section>

        {packageDetails.features.inclusions && (
          <Section headline="Inclusions" headlineVariant="titleMedium">
            {packageDetails.features.inclusions
              .split("\n")
              .map((inclusion, index) => (
                <Text key={index} variant="bodyLarge" style={styles.text}>
                  - {inclusion}
                </Text>
              ))}
          </Section>
        )}

        {packageDetails.features.exclusions && (
          <Section headline="Exclusions" headlineVariant="titleMedium">
            {packageDetails.features.exclusions
              .split("\n")
              .map((exclusion, index) => (
                <Text key={index} variant="bodyLarge" style={styles.text}>
                  - {exclusion}
                </Text>
              ))}
          </Section>
        )}
      </PaddedView>
    </ScrollView>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    wrapper: {
      gap: spacing.lg,
    },
    tagContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    text: {
      textAlign: "justify",
      color: colors.onBackground,
    },
  })
