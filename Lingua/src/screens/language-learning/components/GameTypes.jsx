import { CustomButton } from "@components/molecules/CustomButton";
import { border, spacing } from "@constants/globalStyles";
import { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";

export function GuessTheWord({ choices, answer, onPress }) {
  const { word, image } = answer;
  console.log("Choices: ", JSON.stringify(choices, null, 2));
  const [score, setScore] = useState(0);
  const imgSrc = image || require("@assets/images/placeholder.jpg");

  const handlePress = ({ id, isCorrect }) => {
    onPress({ id, isCorrect });
  };

  const renderChoices = () => {
    return choices.map((choice, index) => {
      const { vocab, isCorrect } = choice;
      return (
        <CustomButton
          style={{ width: "48%", height: "48%", padding: spacing.md }}
          key={index}
          onPress={() => handlePress({ id: vocab.id, isCorrect })}
        >
          <View style={{ alignItems: "center", gap: spacing.sm, flex: 1 }}>
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
