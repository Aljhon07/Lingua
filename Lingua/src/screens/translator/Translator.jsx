import { Button, StyleSheet, View } from "react-native";
import SpeechRecog from "./SpeechRecog";
import { SafeAreaView } from "react-native-safe-area-context";
import { LanguageList } from "@components/atoms/LanguageList";
import Phrasebook from "./PhraseBook";
import { useState } from "react";
import { spacing } from "@constants/globalStyles";
import { CustomButton } from "@components/molecules/CustomButton";

export default function Translator() {
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <SpeechRecog />
      <View style={styles.buttonGroup}>
        <LanguageList label="Translate to" />
        <CustomButton onPress={() => setVisible(true)}>
          View Phrasebook
        </CustomButton>
        <Phrasebook visible={visible} setVisible={setVisible} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  buttonGroup: {
    gap: spacing.md,
  },
});
