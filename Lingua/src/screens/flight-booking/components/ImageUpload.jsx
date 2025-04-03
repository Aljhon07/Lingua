import { CustomButton } from "@components/molecules/CustomButton"
import { ScrollView } from "react-native-gesture-handler"
import { usePassengerInfoContext } from "@context/PassengerInfoProvider"
import { IconButton, useTheme } from "react-native-paper"
import * as ImagePicker from "expo-image-picker"
import { convertRgbToRgba } from "@utils/color"
import { Image, StyleSheet, View } from "react-native"
import { spacing } from "@constants/globalStyles"

export default function ImageUpload({ index, focusedIndex }) {
  const { updateInfo, passengers } = usePassengerInfoContext()
  const { documents } = passengers[index]

  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)

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

    updateInfo(index, "documents", [...uris, ...documents])
  }

  const removeImage = (imageIndex) => {
    const updatedImages = documents.filter((_, i) => i !== imageIndex)
    updateInfo(index, "documents", updatedImages)
  }

  const imageComps = documents.map((image, i) => {
    return (
      <View key={`${i}: ${image.name}`}>
        <IconButton
          style={styles.closeButton}
          size={20}
          icon={"close"}
          containerColor={convertRgbToRgba(colors.errorContainer, 0.8)}
          onPress={() => removeImage(i)}
        />
        <Image source={{ uri: image.uri }} style={styles.image} />
      </View>
    )
  })
  return (
    <View style={{ gap: spacing.md }}>
      <ScrollView style={styles.scrollView} horizontal>
        <View style={styles.imageContainer}>
          {documents.length > 0 && imageComps}
        </View>
      </ScrollView>
      {focusedIndex === index && (
        <CustomButton onPress={handlePress} style={styles.uploadBtn}>
          Upload Document (Images)
        </CustomButton>
      )}
    </View>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    scrollView: {},
    uploadBtn: {},
    imageContainer: {
      gap: spacing.md,
      flexDirection: "row",
    },
    addBtn: {
      borderWidth: 2,
      flexDirection: "row",
      borderColor: colors.primary,
      borderStyle: "dashed",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: roundness,
    },
    closeButton: {
      position: "absolute",
      top: 0,
      right: 0,
      zIndex: 1,
      borderRadius: spacing.md,
    },
  })
