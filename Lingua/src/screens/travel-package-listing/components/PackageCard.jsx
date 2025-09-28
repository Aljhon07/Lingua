import React from "react"
import { cloudinary } from "@constants/api"
import { ImageBackground, Pressable, StyleSheet, View } from "react-native"
import { Text, IconButton, useTheme, Button } from "react-native-paper"
import { spacing } from "@constants/globalStyles"
import { useNavigation } from "@react-navigation/native"

export function PackageCard({ item }) {
  const navigation = useNavigation()
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)
  const imageURL = `${cloudinary.images}/${item.cover}`

  const handleNavigate = () => {
    navigation.navigate("PackageDetailsNavigation", {
      item: {
        ...item,
        cover: imageURL,
      },
    })
  }

  return (
    <Pressable style={styles.card} onPress={handleNavigate}>
      <ImageBackground source={{ uri: imageURL }} style={styles.image}>
        <View style={styles.content}>
          <View style={styles.detailsOverview}>
            <Text variant="labelLarge" style={styles.surfaceText}>
              {item.country.name}
            </Text>
            <Text variant="titleSmall">{item.name}</Text>
          </View>
          <Button
            mode="contained"
            contentStyle={{ flexDirection: "row-reverse" }}
            onPress={handleNavigate}
            icon={"open-in-new"}
            iconColor={colors.primary}
          >
            View Details
          </Button>
        </View>
      </ImageBackground>
    </Pressable>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    card: {
      borderRadius: roundness,
      overflow: "hidden",
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: colors.outline,
    },

    image: {
      width: "100%",
      height: 250,
      borderRadius: roundness,
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: spacing.lg,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md + 4,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.surface
        .replace("rgb", "rgba")
        .replace(")", ", 0.8)"),
    },
    detailsOverview: {
      flex: 1,
      minHeight: 50,
      justifyContent: "center",
    },
    surfaceText: {
      color: colors.onBackground,
    },
  })
