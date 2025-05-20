import { CustomButton } from "@components/molecules/CustomButton";
import { spacing } from "@constants/globalStyles";
import { usePlayback } from "@hooks/usePlayback";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { JumpingTransition } from "react-native-reanimated";

export default function Vocabulary({ vocab }) {
  const { translated_word, word_transliteration, audio } =
    vocab.translations[0];
  const { playAudio, isPlaying } = usePlayback(audio);
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const localFontConfig = {
    fonts: {
      bodyLarge: {
        fontSize: 24,
        lineHeight: 26,
      },
      bodyMedium: {
        fontSize: 22,
        lineHeight: 20,
      },
    },
  };
  return (
    <View style={styles.container}>
      <CustomButton
        icon="volume-source"
        iconSize={26}
        style={{ alignItems: "flex-start" }}
        contentStyle={{
          gap: spacing.md,
        }}
        onPress={playAudio}
      >
        <View style={{ gap: spacing.sm, alignSelf: "flex-start" }}>
          <View style={{ flexDirection: "row", gap: spacing.md }}>
            <Text
              variant="bodyLarge"
              style={styles.translation}
              theme={localFontConfig}
            >
              {translated_word}
            </Text>
            <Text variant="bodyLarge">{`(${word_transliteration})`}</Text>
          </View>
          <Text
            variant="bodyMedium"
            theme={localFontConfig}
            style={styles.english}
          >
            {vocab.word}
          </Text>
        </View>
      </CustomButton>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.sm,
      gap: spacing.lg,
    },
    translation: {
      fontFamily: "NotoSans-Regular",
    },
    english: {
      color: colors.surfaceVariant,
    },
  });
