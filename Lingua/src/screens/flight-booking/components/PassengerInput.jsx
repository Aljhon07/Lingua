import React from "react"
import { CustomButton } from "@components/molecules/CustomButton"
import { spacing } from "@constants/globalStyles"
import { Image, StyleSheet, View } from "react-native"
import { IconButton, TextInput, useTheme } from "react-native-paper"
import * as ImagePicker from "expo-image-picker"
import { ScrollView } from "react-native-gesture-handler"

export default function PassengerInput({ index, passenger, handleChange }) {
  const images = passenger.documents

  const handlePress = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
    })

    const uris = results.assets.map((asset) => ({
      fileName: asset.fileName,
      uri: asset.uri,
    }))

    handleChange(index, "documents", [...uris, ...images])
  }

  const { colors } = useTheme()
  const styles = createStyles()

  const imageComps = images.map((image, i) => (
    <View key={`${i}: ${image.name}`}>
      <IconButton
        style={styles.closeButton}
        size={20}
        icon={"close"}
        containerColor={colors.errorContainer}
      />
      <Image source={{ uri: image.uri }} style={styles.image} />
    </View>
  ))

  return (
    <View
      style={{
        gap: spacing.md,
      }}
    >
      <TextInput
        mode="outlined"
        label={"Passenger Name"}
        value={passenger.name}
        onChangeText={(value) => handleChange(index, "name", value)}
      />
      <ScrollView horizontal>
        <View style={styles.imageContainer}>
          {images.length > 0 && imageComps}
        </View>
      </ScrollView>
      <CustomButton onPress={handlePress} style={styles.uploadBtn}>
        Upload Document (Image)
      </CustomButton>
    </View>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    uploadBtn: {},
    imageContainer: {
      gap: spacing.md,
      flexDirection: "row",
    },
    image: {
      width: 100,
      height: 100,
    },
    closeButton: {
      position: "absolute",
      top: 0,
      right: 0,
      zIndex: 1,
    },
  })
