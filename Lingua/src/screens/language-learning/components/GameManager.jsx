import { useEffect, useState } from "react";
import { GuessTheWord } from "./GameTypes";
import _ from "lodash";
import { ProgressBar, Text } from "react-native-paper";
import { Alert, View } from "react-native";
import { spacing } from "@constants/globalStyles";

export default function GameManager({ vocabList }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(
      vocabList.map((vocab, idx) => {
        const filteredVocab = vocabList.map(
          (item) =>
            item.id !== vocab.id && {
              vocab: item,
              isCorrect: false,
            }
        );
        let choices = _.shuffle(filteredVocab).slice(0, 3);
        choices.push({
          vocab: vocab,
          isCorrect: true,
        });
        choices = _.shuffle(choices);
        return (
          <GuessTheWord
            choices={choices}
            answer={vocab}
            onPress={handleAnswer}
          />
        );
      })
    );
  }, []);

  const handleAnswer = ({ id, isCorrect }) => {
    if (isCorrect) {
      setScore(score + 1);
      setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
      console.log("Correct Answer");
      console.log("Score: ", score);
      console.log("Current Question: ", questions.length);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      Alert.alert(
        "Quiz Completed",
        `Your score is ${score} out of ${questions.length}`,
        [
          {
            text: "OK",
          },
        ]
      );
    }
  };
  return (
    <View style={{ padding: spacing.lg, flex: 1 }}>
      <ProgressBar
        progress={
          questions.length > 0
            ? Math.round((currentQuestion + 1) / questions.length)
            : 0
        }
        color="#6200ee"
      />
      <View
        style={{
          marginVertical: spacing.lg,
          flex: 1,
        }}
      >
        {questions.length > 0 && questions[currentQuestion]}
      </View>
    </View>
  );
}
