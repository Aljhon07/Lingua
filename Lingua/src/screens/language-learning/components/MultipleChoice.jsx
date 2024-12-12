import { spacing } from "@constants/globalStyles"
import { useEffect, useState } from "react"
import { StyleSheet, Text, Touchable, View } from "react-native"
import { TouchableRipple, useTheme } from "react-native-paper"

export function MultipleChoice({ choices, handleNext }) {
  console.error(choices)
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
      style={conditonalStyling(index)}
      onPress={() => handlePress(index)}
    >
      <Text variant="bodyLarge" style={styles.choice}>
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
      fontSize: 28,
      fontFamily: "CrimsonText-Regular",
    },
  })
