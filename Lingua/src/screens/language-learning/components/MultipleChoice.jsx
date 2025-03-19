import { spacing } from "@constants/globalStyles"
import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { TouchableRipple, useTheme, Text } from "react-native-paper"

export function MultipleChoice({ choices, handleNext }) {
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const handlePress = (index) => {
    setSelectedIndex(index)
    conditonalStyling(index)

    setTimeout(() => {
      setSelectedIndex(null)
      handleNext()
    }, 300)
  }

  const conditonalStyling = (index) => {
    if (choices[index].is_correct && selectedIndex === index) {
      return {
        ...styles.choiceContainer,
        backgroundColor: colors.successContainer,
      }
    } else if (!choices[index].is_correct && selectedIndex === index) {
      return {
        ...styles.choiceContainer,
        backgroundColor: colors.errorContainer,
      }
    } else {
      return styles.choiceContainer
    }
  }

  const choicesComponent = choices.map((item, index) => (
    <TouchableRipple
      key={index}
      style={conditonalStyling(index)}
      onPress={() => handlePress(index)}
    >
      <Text variant="headlineSmall" style={styles.choice}>
        {item.answer}
      </Text>
    </TouchableRipple>
  ))

  return <View style={styles.container}>{choicesComponent}</View>
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    container: {
      flex: 0,
      width: "100%",
      alignItems: "center",
    },
    choiceContainer: {
      marginBottom: spacing.md,
      padding: spacing.md,
      borderWidth: 1,
      borderRadius: roundness,
      width: "70%",
    },
    choice: {
      textAlign: "center",
      fontFamily: "CrimsonText-Regular",
      color: "white",
    },
  })
