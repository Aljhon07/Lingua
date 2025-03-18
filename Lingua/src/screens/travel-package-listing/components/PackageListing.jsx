import { FlatList, RefreshControl } from "react-native-gesture-handler"
import { StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"

import PaddedView from "@components/atoms/PaddedView"
import { Section } from "@components/atoms/Section"
import DataContainer from "@components/layouts/DataContainer"
import { PackageCard } from "./PackageCard"

export default function PackageListing({
  packagesState,
  getPackages,
  headline,
}) {
  const { colors } = useTheme()
  const styles = createStyles(colors)

  return (
    <PaddedView style={styles.screen}>
      <DataContainer
        error={packagesState.error}
        loading={packagesState.loading}
        errorMessage={"Failed to fetch packages"}
        noDataComponent="No Packages Available!"
        data={packagesState.data}
      >
        <Section
          headline={headline}
          headlineVariant="titleMedium"
          sectionStyle={styles.packageSection}
          contentContainerStyle={styles.section}
        >
          <FlatList
            refreshControl={
              <RefreshControl
                onRefresh={getPackages}
                refreshing={packagesState.loading}
              />
            }
            data={packagesState.data}
            renderItem={({ item }) => <PackageCard item={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </Section>
      </DataContainer>
    </PaddedView>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      gap: spacing.lg,
    },
    section: {
      backgroundColor: "transparent",
      padding: 0,
    },
  })
