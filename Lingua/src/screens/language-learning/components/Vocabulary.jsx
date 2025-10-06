import { CustomButton } from "@components/molecules/CustomButton";
import { cloudinary } from "@constants/api";
import { spacing } from "@constants/globalStyles";
import { usePlayback } from "@hooks/usePlayback";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { JumpingTransition } from "react-native-reanimated";

export default function Vocabulary({ vocab }) {
  const { translated_word, word_transliteration, audio } =
    vocab.translations[0];
  const { playSound, isPlaying } = usePlayback(
    `${cloudinary.audio}${audio}.mp3`
  );
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const localFontConfig = {
    fonts: {
      bodyLarge: {
        fontSize: 24,
        lineHeight: 26,
      },
      bodyMedium: {
        fontSize: 20,
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
        onPress={playSound}
      >
        <View style={{ gap: spacing.sm, width: "100%" }}>
          <View style={{ flexDirection: "row", gap: spacing.md }}>
            <Text
              variant="bodyLarge"
              style={styles.translation}
              theme={localFontConfig}
            >
              {translated_word}
            </Text>
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
      color: colors.onSurfaceVariant,
    },
  });
