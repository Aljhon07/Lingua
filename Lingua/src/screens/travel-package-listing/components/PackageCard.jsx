import React from "react"
import { cloudinary } from "@constants/api"
import { Image, StyleSheet, View } from "react-native"
import { Text, TouchableRipple, useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { CustomButton } from "@components/molecules/CustomButton"
import { useNavigation } from "@react-navigation/native"

export function PackageCard({ item }) {
  const navigation = useNavigation()
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)

  const imageURL = `${cloudinary.baseURL}/${cloudinary.images}/${item.cover}`

  console.log("card", item)
  const handleNavigate = () => {
    navigation.navigate("PackageDetailsNavigation", {
      imageURL,
      item,
    })
  }
  return (
    <TouchableRipple style={styles.card} onPress={handleNavigate}>
      <>
        <Image style={styles.image} source={{ uri: imageURL }} />
        <View style={styles.content}>
          <Text variant="titleLarge">{item.name}</Text>
          <Text variant="labelLarge" style={styles.surfaceText}>
            {item.country.name}
          </Text>
          <View style={styles.detailsOverview}>
            <Text>
              <Text variant="titleMedium" style={styles.price}>
                ₱{item.price}
              </Text>
              /person
            </Text>
            <CustomButton onPress={handleNavigate}>Details</CustomButton>
          </View>
        </View>
      </>
    </TouchableRipple>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: roundness,
      overflow: "hidden",
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.primary,
      padding: spacing.md,
    },
    image: {
      width: "100%",
      height: 200,
      borderRadius: roundness,
    },
    content: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    },
    detailsOverview: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    price: {
      color: colors.primary,
    },
    surfaceText: {
      color: colors.onSurfaceVariant,
    },
  })
