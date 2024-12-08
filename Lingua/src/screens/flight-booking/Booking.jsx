import { Section } from "@components/atoms/Section"
import { CustomButton } from "@components/molecules/CustomButton"
import { spacing } from "@constants/globalStyles"
import { useInputChange } from "@hooks/useInputChange"
import { Image, StyleSheet, View } from "react-native"
import { Text, TextInput, useTheme } from "react-native-paper"

export default function Booking({ route }) {
  const { colors, roundness } = useTheme()
  const styles = createStyle(colors, roundness)
  const { imageURL, name, price } = route.params
  const [information, setInformation] = useInputChange({})

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
          value={information.firstName}
          onChange={(text) => setInformation("firstName", text)}
        />
        <TextInput
          mode="outlined"
          label={"Last Name"}
          value={information.lastName}
          onChange={(text) => setInformation("lastName", text)}
        />
        <CustomButton primary>Submit</CustomButton>
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
