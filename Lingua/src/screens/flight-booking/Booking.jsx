import { Section } from "@components/atoms/Section"
import { CustomButton } from "@components/molecules/CustomButton"
import { spacing } from "@constants/globalStyles"
import { useInputChange } from "@hooks/useInputChange"
import { Image, StyleSheet, View } from "react-native"
import { Text, TextInput, useTheme } from "react-native-paper"
import { SubmitDocuments } from "./components/SubmitDocuments"
import { useState } from "react"
import { uploadImages, uploadTransactions } from "@services/directus/rest"
import { useQueryState } from "@hooks/useQueryState"

export default function Booking({ route, navigation }) {
  const [images, setImages] = useState([])
  const { colors, roundness } = useTheme()
  const styles = createStyle(colors, roundness)
  const { imageURL, name, price, id } = route.params
  const [information, handleInputChange] = useInputChange({
    firstName: null,
    lastName: null,
  })

  console.log(information)
  const handleSubmit = async () => {
    try {
      await uploadTransactions(
        information.firstName,
        information.lastName,
        price,
        id
      )
      console.log("Form submitted:", information)
      navigation.navigate("VisibleTabs")
    } catch (error) {
      console.error("Failed to upload documents:", error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.packageDetails}>
        <Image source={{ uri: imageURL }} style={styles.image} />
        <View style={styles.wrapper}>
          <Text variant="headlineMedium">{name}</Text>
          <Text variant="titleSmall">₱{price}</Text>
        </View>
      </View>

      <Section
        headline={"Personal Information"}
        headlineVariant="headlineSmall"
        contentContainerStyle={{
          backgroundColor: "transparent",
          padding: 0,
          gap: spacing.md,
        }}
      >
        <TextInput
          mode="outlined"
          label={"First Name"}
          textContentType="givenName"
          value={information.firstName}
          onChangeText={(text) => handleInputChange("firstName", text)}
        />
        <TextInput
          mode="outlined"
          label={"Last Name"}
          textContentType="familyName"
          value={information.lastName}
          onChangeText={(text) => handleInputChange("lastName", text)}
        />
        <SubmitDocuments images={images} setImages={setImages} />
        <CustomButton primary onPress={handleSubmit}>
          Submit
        </CustomButton>
      </Section>
    </View>
  )
}

const createStyle = (colors, roundness) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      gap: spacing.lg,
    },
    image: {
      width: "100%",
      borderRadius: roundness,
      aspectRatio: 16 / 9,
    },
    packageDetails: {
      gap: spacing.lg,
    },
    wrapper: {
      gap: spacing.sm,
    },
  })
