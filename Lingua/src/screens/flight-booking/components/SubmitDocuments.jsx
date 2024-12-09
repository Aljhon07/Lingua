import { spacing } from "@constants/globalStyles"
import * as ImagePicker from "expo-image-picker"
import { Image, StyleSheet, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Button, IconButton, useTheme } from "react-native-paper"

export function SubmitDocuments({ images, setImages }) {
  const { colors } = useTheme()
  const styles = createStyles(colors)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsMultipleSelection: true,
    })

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri)
      setImages((prevImages) => [...prevImages, ...selectedImages])
    }
  }

  const removeImage = (uri) => {
    setImages((prevImages) => prevImages.filter((image) => image.uri !== uri))
  }

  return (
    <View style={styles.container}>
      <Button mode="outlined" onPress={pickImage}>
        Upload Requirements
      </Button>
      <FlatList
        horizontal
        data={images}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <IconButton
              icon="close"
              size={20}
              onPress={() => removeImage(item)}
              style={styles.removeButton}
              iconColor={colors.onErrorContainer}
            />
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
      />
    </View>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    imageContainer: {
      margin: spacing.md,
    },
    image: {
      width: 200,
      height: 200,
    },
    removeButton: {
      position: "absolute",
      top: 5,
      right: 5,
      backgroundColor: colors.errorContainer,
      zIndex: 1,
    },
  })
