import { Text, useTheme } from "react-native-paper"
import { Image, StyleSheet } from "react-native"
import { View } from "react-native"
import { spacing } from "@constants/globalStyles"
import { useQueryState } from "@hooks/useQueryState"
import { useEffect } from "react"
import { fetchPackageDetails } from "@services/directus/rest"
import DataContainer from "@components/layouts/DataContainer"
import PackageDetailsTabs from "@navigation/PackageDetailsTabs"
import { CustomButton } from "@components/molecules/CustomButton"

export default function PackageDetails({ route, navigation }) {
  const { imageURL, item } = route.params
  console.log(item)
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)

  const { executeQuery, getQueryState } = useQueryState()
  const packageDetails = getQueryState("packageDetails")
  useEffect(() => {
    executeQuery("packageDetails", fetchPackageDetails, item.id)
  }, [])

  const handleBookingNavigate = () => {
    navigation.navigate("BookingScreen", {
      name: item.name,
      price: item.price,
      id: item.id,
      imageURL,
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
          <Image style={styles.image} source={{ uri: imageURL }} />
          <View style={styles.overlay}>
            <Text variant="titleSmall" style={styles.title}>
              {item.name}
            </Text>
            <Text variant="titleSmall" style={styles.price}>
              ₱{item.price}
              <Text style={styles.price}>/person</Text>
            </Text>
          </View>
        </View>
        <PackageDetailsTabs packageDetails={packageDetails} />
        <CustomButton primary onPress={handleBookingNavigate}>
          Book Now!
        </CustomButton>
      </View>
    </DataContainer>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    container: {
      padding: spacing.md,
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
    overlay: {
      position: "absolute",
      bottom: spacing.md,
      left: spacing.md,
      right: spacing.md,
      backgroundColor: "red",
      padding: spacing.lg,
      backgroundColor: colors.primaryContainer,
      color: colors.onPrimaryContainer,
      flexDirection: "row",
      gap: spacing.md,
      alignItems: "center",
      borderRadius: roundness,
    },
    title: {
      flex: 1,
    },
    price: {
      color: colors.onPrimaryContainer,
    },
  })
