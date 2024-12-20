import { Section } from "@components/atoms/Section"
import { spacing } from "@constants/globalStyles"
import { CustomTag } from "@components/atoms/CustomTag"
import { StyleSheet } from "react-native"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import { Text, useTheme } from "react-native-paper"

export function PackageOverview({ route }) {
  const { data: packageDetails } = route.params
  const { colors, roundness } = useTheme()

  const styles = createStyles(colors, roundness)
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Section headline={"Description"}>
        <Text variant="bodyLarge" style={styles.description}>
          {packageDetails.description}
        </Text>
      </Section>

      <Section
        headline="Features"
        contentContainerStyle={{ backgroundColor: "transparent", padding: 0 }}
      >
        <FlatList
          data={packageDetails.features.basic_features}
          renderItem={({ item }) => (
            <CustomTag
              label={item}
              style={{ marginRight: spacing.md, marginBottom: spacing.md }}
            />
          )}
          style={{ flexDirection: "row" }}
          numColumns={3}
          scrollToOverflowEnabled={false}
        />
      </Section>
      <Section
        headline="Inclusions"
        headlineVariant="labelLarge"
        contentContainerStyle={{ backgroundColor: colors.successContainer }}
        textColor={colors.onSucessContainer}
      >
        <Text variant="bodyLarge" style={colors.onSucessContainer}>
          {packageDetails.features.inclusions}
        </Text>
      </Section>

      <Section
        headline="Exclusions"
        headlineVariant="labelLarge"
        contentContainerStyle={styles.exclusionContent}
        textColor={styles.exclusionText}
      >
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
    exclusionContent: {
      backgroundColor: colors.errorContainer,
    },
    exclusionText: {
      color: colors.onErrorContainer,
    },
  })
