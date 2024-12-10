import { spacing } from "@constants/globalStyles"
import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { MultipleChoice } from "./MultipleChoice"
import { CustomButton } from "@components/molecules/CustomButton"
import { useNavigation } from "@react-navigation/native"

export function GameHandler({ data }) {
  const navigation = useNavigation()
  const questions = data[0].questions
  const [numberOfItems, setNumberOfItems] = useState(questions.length)
  const [currentItem, setCurrentItem] = useState(0)
  const [life, setLife] = useState(3)
  console.log(currentItem, numberOfItems)

  const handleNext = () => {
    setCurrentItem(currentItem + 1)
  }

  const handleWrongAnswer = () => {
    setLife(life - 1)
  }

  if (currentItem === numberOfItems)
    return (
      <CustomButton primary onPress={() => navigation.navigate("LessonList")}>
        Completed
      </CustomButton>
    )

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.question}>
        {questions[currentItem].question}
      </Text>
      <MultipleChoice
        choices={questions[currentItem].answers}
        handleNext={handleNext}
        handleWrongAnswer={handleWrongAnswer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
    gap: spacing.lg,
  },
  question: {
    textAlign: "center",
  },
})
