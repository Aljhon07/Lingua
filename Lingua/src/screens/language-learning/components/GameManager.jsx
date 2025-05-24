import { useCallback, useEffect, useState } from "react";
import { GuessTheWord } from "./GameTypes";
import _ from "lodash";
import { ProgressBar, Text } from "react-native-paper";
import { Alert, View } from "react-native";
import { spacing } from "@constants/globalStyles";
import { useNavigation } from "@react-navigation/native";

export default function GameManager({ vocabList }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const shuffledVocab = _.shuffle(vocabList);
    setQuestions(
      shuffledVocab.map((vocab, idx) => {
        const filteredVocab = shuffledVocab.filter(
          (item) => item.id !== vocab.id
        );
        console.log("Filtered: ", JSON.stringify(filteredVocab, null, 2));
        let choices = _.shuffle(filteredVocab)
          .slice(0, 3)
          .map((item) => {
            return {
              vocab: item,
              isCorrect: false,
            };
          });

        choices.push({
          vocab: vocab,
          isCorrect: true,
        });
        choices = _.shuffle(choices);
        return choices;
      })
    );
  }, [vocabList]);

  // console.log("Questions: ", JSON.stringify(questions, null, 2));
  const handleAnswer = ({ id, isCorrect }) => {
    console.log("Curr Question: ", currentQuestion);
    console.log("Length: ", questions.length);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      let totalScore = score;
      totalScore += isCorrect ? 1 : 0;
      showAlert(totalScore);

      setCurrentQuestion(0);
      setScore(0);
    }
  };

  const showAlert = (totalScore) => {
    Alert.alert(
      "Quiz Completed",
      `Your score is ${totalScore} out of ${questions.length}`,
      [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("MainTab", {
              screen: "LessonsNavigation",
            });
          },
        },
      ]
    );
  };
  console.log("Current Question: ", currentQuestion);
  console.log(((currentQuestion + 1) / questions.length).toFixed(2));
  return (
    <View style={{ padding: spacing.lg, flex: 1 }}>
      <ProgressBar
        progress={
          questions.length > 0
            ? parseFloat((currentQuestion / questions.length).toFixed(2))
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
        {questions.length > 0 && (
          <GuessTheWord
            choices={questions[currentQuestion]}
            onPress={handleAnswer}
          />
        )}
      </View>
    </View>
  );
}
