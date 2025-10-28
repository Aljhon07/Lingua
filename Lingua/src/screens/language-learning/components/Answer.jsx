import { TouchableOpacity } from "react-native-gesture-handler"
import { Text } from "react-native-paper"

export default function Answer({ vocab, isCorrect, onSelect }) {
  return (
    <TouchableOpacity onPress={() => onSelect(vocab)}>
      <Text style={{ color: isCorrect ? "green" : "red" }}>
        {vocab.word} - {isCorrect ? "Correct" : "Incorrect"}
      </Text>
    </TouchableOpacity>
  )
}
