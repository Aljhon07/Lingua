import { Icon, Text, useTheme } from "react-native-paper"
import { ImageBackground, StyleSheet } from "react-native"
import { View } from "react-native"
import { spacing } from "@constants/globalStyles"
import { useQueryState } from "@hooks/useQueryState"
import { useEffect } from "react"
import { fetchPackageDetails } from "@services/directus/rest"
import DataContainer from "@components/layouts/DataContainer"
import PackageDetailsTabs from "@navigation/PackageDetailsTabs"
import { CustomButton } from "@components/molecules/CustomButton"
import PaddedView from "@components/atoms/PaddedView"

export default function PackageDetails({ route, navigation }) {
  const { item } = route.params
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)

  const { executeQuery, getQueryState } = useQueryState()
  const packageDetails = getQueryState("packageDetails")

  useEffect(() => {
    executeQuery("packageDetails", fetchPackageDetails, item.id)
  }, [])

  const handleBookingNavigate = () => {
    navigation.navigate("Booking", {
      item,
    })
  }
  return (
    <DataContainer
      data={packageDetails.data}
      error={packageDetails.error}
      loading={packageDetails.loading}
      errorMessage={"Failed to fetch package details."}
    >
      <View style={styles.container}>
        <View style={styles.coverImg}>
          <ImageBackground style={styles.image} source={{ uri: item.cover }}>
            <View style={styles.label}>
              <Text variant="titleSmall" style={styles.title}>
                {item.name}
              </Text>
              <Text variant="titleMedium" style={styles.price}>
                ~₱{item.price}
                <Text style={styles.price}>/person</Text>
              </Text>
            </View>
          </ImageBackground>
        </View>
        <PackageDetailsTabs packageDetails={packageDetails} />

        <PaddedView vertical={spacing.md}>
          <CustomButton
            primary
            onPress={handleBookingNavigate}
            icon={"arrow-right-thin"}
            contentStyle={{ flexDirection: "row-reverse" }}
          >
            Book Now
          </CustomButton>
        </PaddedView>
      </View>
    </DataContainer>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    coverImg: {
      borderRadius: roundness,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      aspectRatio: 16 / 9,
    },
    label: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: spacing.lg,
      backgroundColor: colors.surface
        .replace("rgb", "rgba")
        .replace(")", ", 0.9)"),
      color: colors.onPrimaryContainer,
      flexDirection: "row",
      gap: spacing.md,
      alignItems: "center",
    },
    title: {
      flex: 1,
    },
    price: {
      color: colors.primary,
    },
  })
