import React, { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { FlatList, RefreshControl } from "react-native-gesture-handler"
import { IconButton, useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { useNavigation } from "@react-navigation/native"
import { useQueryState } from "@hooks/useQueryState"
import { fetchPackages } from "@services/directus/rest"
import { PackageCard } from "../../travel-package-listing/components/PackageCard"
import PaddedView from "@components/atoms/PaddedView"
import { Section } from "@components/atoms/Section"
import DataContainer from "@components/layouts/DataContainer"

export default function RecommendedPackages() {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const styles = createStyles(colors)
  const { getQueryState, executeQuery } = useQueryState()
  const packagesState = getQueryState("recommended-packages")

  useEffect(() => {
    executeQuery("recommended-packages", fetchPackages, "limit=3")
  }, [])

  const handleViewAllPackages = () => {
    navigation.navigate("Explore")
  }

  return (
    <PaddedView>
      <Section
        headline="Recommended Packages"
        sectionStyle={{ minHeight: 200 }}
        headlineVariant="titleMedium"
        contentContainerStyle={styles.section}
        actionLabel="View All"
        onAction={handleViewAllPackages}
        rightComponent={
          <IconButton
            icon="reload"
            onPress={() =>
              executeQuery("recommended-packages", fetchPackages, "limit=3")
            }
          ></IconButton>
        }
      >
        <DataContainer
          loading={packagesState.loading}
          error={packagesState.error}
          data={packagesState.data}
          noDataMessage="No recommended packages available."
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={packagesState.data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PackageCard item={item} horizontal={true} />
            )}
            contentContainerStyle={styles.scrollContainer}
            ItemSeparatorComponent={() => (
              <View style={{ width: spacing.md }} />
            )}
          />
        </DataContainer>
      </Section>
    </PaddedView>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    section: {
      backgroundColor: "transparent",
    },
    scrollContainer: {
      paddingHorizontal: spacing.sm,
    },
  })
