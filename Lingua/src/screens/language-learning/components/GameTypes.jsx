import { spacing } from "@constants/globalStyles";
import { usePlayback } from "@hooks/usePlayback";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { cloudinary } from "@constants/api";
import Playable from "./Playable";
import { Asset } from "expo-asset";

const correctSfx =
  Asset.fromModule(require("@assets/audio/correct.mp3")).uri + ".mp3";

export function GuessTheWord({ choices, handleAnswer }) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    setIsCorrect(false);
    setSelected(null);
  }, [choices]);

  const { vocab: answer } = choices.filter(
    (choice) => choice.isCorrect === true
  )[0];

  const audio = `${cloudinary.audio}${answer.translations[0].audio}.mp3`;
  const sentence_audio = `${cloudinary.audio}${answer.translations[0].audio_sentence}.mp3`;
  const { playSound, isPlaying } = usePlayback(audio);
  const { playSound: playSentence, isPlaying: isSentencePlaying } =
    usePlayback(sentence_audio);
  const { playSound: playSfx } = usePlayback();

  const handlePress = ({ id, isCorrect }) => {
    console.log("Pressed: ", id, isCorrect);

    setIsCorrect(isCorrect);
    setSelected(id);
  };

  const handleNext = () => {
    setSelected(null);
    setIsCorrect(false);
    handleAnswer({ selected, isCorrect });
  };
  const renderChoices = () => {
    return choices.map((choice, index) => {
      const { vocab, isCorrect } = choice;
      const { image } = vocab;
      let imgSrc = require("@assets/images/placeholder.jpg");
      if (image) {
        imgSrc = cloudinary.images + image + ".png";
      }

      return (
        <Button
          mode="outlined"
          key={index}
          onPress={() => handlePress({ id: vocab.id, isCorrect })}
        >
          <Text variant="bodyLarge">{vocab?.word}</Text>
        </Button>
      );
    });
  };

  return (
    <View style={{ flex: 1, gap: spacing.lg }}>
      {selected == null ? (
        <>
          <Text variant="titleLarge" style={{ textAlign: "center" }}>
            Translate the word
          </Text>
          <View style={{ gap: spacing.lg, flex: 1 }}>
            <Playable playSound={playSound} isPlaying={isPlaying}>
              <View>
                <Text variant="headlineSmall">
                  {answer.translations[0].translated_word}
                </Text>
                <Text variant="bodyMedium">
                  {answer.translations[0].word_transliteration}
                </Text>
              </View>
            </Playable>

            <View
              style={{
                flexDirection: "column",
                alignContent: "center",
                gap: spacing.md,
                flex: 1,
              }}
            >
              {renderChoices()}
            </View>
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              flex: 1,
              gap: spacing.lg,
            }}
          >
            <>
              <View>
                <Text
                  variant="headlineMedium"
                  style={{
                    color: isCorrect ? "green" : "red",
                  }}
                >
                  {isCorrect ? "Correct!" : "Oops! Incorrect!"}
                </Text>
                <Text variant="bodyLarge">Question:</Text>
                <Playable
                  playSound={() => playSound(audio)}
                  isPlaying={isPlaying}
                >
                  <View>
                    <Text variant="headlineSmall">
                      {answer.translations[0].translated_word}
                    </Text>
                    <Text variant="bodyMedium">
                      {answer.translations[0].word_transliteration}
                    </Text>
                  </View>
                </Playable>
              </View>

              <View>
                {isCorrect ? (
                  <>
                    <Text
                      variant="bodyLarge"
                      style={{ marginTop: spacing.md, wordBreak: "break-word" }}
                    >
                      Sample Sentence:
                    </Text>

                    <Text
                      variant="bodyMedium"
                      style={{ fontStyle: "italic", wordBreak: "break-word" }}
                    >
                      {answer.sentence}
                    </Text>
                    <Text variant="bodyLarge" style={{ marginTop: spacing.md }}>
                      Translation:
                    </Text>
                    <Playable
                      playSound={playSentence}
                      isPlaying={isSentencePlaying}
                    >
                      <View>
                        <Text
                          variant="bodyMedium"
                          style={{ fontStyle: "italic" }}
                        >
                          {answer.translations[0].translated_sentence}
                        </Text>
                        <Text variant="bodyMedium">
                          {answer.translations[0].sentence_transliteration}
                        </Text>
                      </View>
                    </Playable>
                  </>
                ) : (
                  <>
                    <Text variant="bodyLarge" style={{ marginTop: spacing.md }}>
                      Correct answer:
                    </Text>
                    <Text
                      variant="bodyLarge"
                      style={{ fontSize: 20, fontWeight: "bold" }}
                    >
                      {answer.word}
                    </Text>
                  </>
                )}
              </View>
            </>
          </View>
          <Button mode="contained" onPress={handleNext}>
            Next
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  correct: {
    borderColor: "green",
    borderWidth: 2,
  },
  incorrect: {
    borderColor: "red",
    borderWidth: 2,
  },
});
