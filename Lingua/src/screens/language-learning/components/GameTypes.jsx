import { CustomButton } from "@components/molecules/CustomButton";
import { border, spacing } from "@constants/globalStyles";
import { usePlayback } from "@hooks/usePlayback";
import { useState, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { cloudinary } from "@constants/api";

export function GuessTheWord({ choices, onPress }) {
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    setIsIncorrect(false);
    setSelected(null);
  }, [choices]);

  const { vocab: answer } = choices.filter(
    (choice) => choice.isCorrect === true
  )[0];

  const audio = `${cloudinary.audio}${answer.translations[0].audio}.mp3`;
  console.log("Audio: ", audio);
  const { playSound, isPlaying } = usePlayback(audio);

  const handlePress = ({ id, isCorrect }) => {
    setIsIncorrect(!isCorrect);
    setSelected(id);
    setTimeout(() => {
      onPress({ id, isCorrect });
    }, 200);
  };

  const renderChoices = () => {
    return choices.map((choice, index) => {
      const { vocab, isCorrect } = choice;
      const { image } = vocab;
      // console.log("Vocab: ", JSON.stringify(vocab, null, 2), isCorrect);
      const imgSrc = image || require("@assets/images/placeholder.jpg");
      const buttonStyle =
        vocab.id == selected
          ? !isIncorrect
            ? styles.correct
            : styles.incorrect
          : "";
      return (
        <CustomButton
          style={[
            {
              width: "48%",
              height: "48%",
            },
            buttonStyle,
          ]}
          key={index}
          onPress={() => handlePress({ id: vocab.id, isCorrect })}
        >
          <View
            style={{
              alignItems: "center",
              gap: spacing.sm,
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Image
                source={imgSrc}
                style={{
                  height: "80%",
                  resizeMode: "contain",
                  borderRadius: border.lg,
                }}
              />
            </View>
            <Text variant="titleMedium">{vocab?.word}</Text>
          </View>
        </CustomButton>
      );
    });
  };

  return (
    <View style={{ flex: 1, gap: spacing.lg }}>
      <Text style={{ textAlign: "center" }} variant="titleLarge">
        Translate the word
      </Text>
      <View style={{ gap: spacing.lg, flex: 1 }}>
        <CustomButton
          icon={"volume-source"}
          iconSize={32}
          style={{
            width: "auto",
            alignSelf: "flex-start",
            borderWidth: 0,
            borderBottomWidth: 1,
          }}
          onPress={playSound}
        >
          <Text variant="titleLarge">
            {answer.translations[0].translated_word} -
            {answer.translations[0].word_transliteration}
          </Text>
        </CustomButton>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
            gap: spacing.md,
            flex: 1,
          }}
        >
          {renderChoices()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  correct: {
    borderColor: "green",
  },
  incorrect: {
    borderColor: "red",
  },
});
