import React from "react"
import { cloudinary } from "@constants/api"
import { Image, StyleSheet, View } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { CustomButton } from "@components/atoms/CustomButton"

export function PackageCard({ item }) {
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)
  const imageURL = `${cloudinary.baseURL}/${cloudinary.images}/${item.cover}`
  return (
    <View style={styles.card}>
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
          <CustomButton>Details</CustomButton>
        </View>
      </View>
    </View>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: roundness,
      overflow: "hidden",
      elevation: 2,
      marginBottom: spacing.md,
      padding: spacing.lg,
    },
    image: {
      width: "100%",
      height: 200,
      borderRadius: roundness,
    },
    content: {
      paddingTop: spacing.lg,
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
