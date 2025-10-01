import { StyleSheet, View, Animated, Keyboard } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useState, useEffect } from "react";
import { spacing } from "@constants/globalStyles";
import TranslationBox from "./components/TranslationBox";
import * as Speech from "expo-speech";
import Phrasebook from "./PhraseBook";
import { useLanguageContext } from "@context/LanguageProvider";
import { useSpeechRecognition } from "@hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@hooks/useSpeechSynthesis";
import { usePlayback } from "@hooks/usePlayback";
import { useProfileContext } from "@context/ProfileProvider";
import { translateText as translate } from "@services/speech";
import { set } from "lodash";
export default function Translator() {
  const { languages, selectedLanguage, onSelectLanguage } =
    useLanguageContext();
  const { profile } = useProfileContext();
  const [sourceText, setSourceText] = useState();
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("ja");
  const [isTranslating, setIsTranslating] = useState(false);
  const [showPhrasebook, setShowPhrasebook] = useState(false);

  const { isRecording, isProcessing, transcript, handleRecord } =
    useSpeechRecognition(profile?.id);

  const { audioUrl, handleSynthesize } = useSpeechSynthesis();

  const { playSound } = usePlayback();
  // Update source text when transcript changes
  useEffect(() => {
    if (transcript && transcript !== "Processing...") {
      setSourceText(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (sourceText !== "No transcription." && sourceText) {
        translateText(sourceText);
      } else {
        setTranslatedText("");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [sourceText]);

  useEffect(() => {
    if (audioUrl) {
      playSound(audioUrl);
    }
  }, [audioUrl]);

  const translateText = async (text) => {
    if (!text.trim()) {
      setTranslatedText("");
      setIsTranslating(false);
      return;
    }

    setIsTranslating(true);
    try {
      const response = await translate(text, {
        from: sourceLanguage,
        to: targetLanguage,
      });
      console.log(response);
      setTranslatedText(response);
      setTimeout(() => {
        setIsTranslating(false);
      }, 750);
    } catch (error) {
      console.error("Translation error:", error);
      setIsTranslating(false);
    }
  };

  const handleSourceLanguageChange = (language) => {
    console.log("Test src: ", typeof language);
    const langCode = typeof language === "string" ? language : language?.code;
    console.log(`Change src: ${langCode}`);
    if (langCode) {
      setSourceLanguage(langCode);
    }
  };

  const handleTargetLanguageChange = (language) => {
    const langCode = typeof language === "string" ? language : language?.code;
    console.log(`Change tgt: ${langCode}`);
    if (langCode) {
      setTargetLanguage(langCode);
    }
  };

  const handleSpeechSynthesis = () => {
    handleSynthesize(translatedText, targetLanguage);
  };

  const handleSpeechRecognition = () => {
    handleRecord(sourceLanguage);
  };

  const handleTextChange = (text) => {
    setSourceText(text);
  };

  const swapLanguages = () => {
    // Don't swap if translation is in progress to avoid confusion
    if (isTranslating) {
      console.log("Cannot swap languages while translation is in progress");
      return;
    }

    // Store the current values before swapping
    const currentSourceText = "";
    const currentTranslatedText = "";
    const currentSourceLanguage = sourceLanguage;
    const currentTargetLanguage = targetLanguage;

    // Swap the languages
    setSourceLanguage(currentTargetLanguage);
    setTargetLanguage(currentSourceLanguage);

    // Swap the text content - what was translated becomes the new source
    // and what was source becomes the new translated text
    setSourceText(currentTranslatedText);
    setTranslatedText(currentSourceText);

    // Note: We don't update the global language context here because
    // the translator should manage its own language states independently
    // The LanguageList components will update automatically via their lang props

    // console.log("Languages swapped:", {
    //   newSource: currentTargetLanguage,
    //   newTarget: currentSourceLanguage,
    //   newSourceText: currentTranslatedText,
    //   newTranslatedText: currentSourceText,
    // })
  };

  const speakTranslatedText = () => {
    if (translatedText) {
      Speech.speak(translatedText, { language: targetLanguage });
    }
  };

  const clearAll = () => {
    setSourceText("");
    setTranslatedText("");
  };

  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.translatorContainer}>
        <View style={styles.translationBoxes}>
          <TranslationBox
            value={sourceText}
            onChangeText={handleTextChange}
            callbackFn={handleSpeechRecognition}
            isSource={true}
            icon={
              isRecording ? "stop" : isProcessing ? "loading" : "microphone"
            }
            iconColor={isRecording ? colors.error : colors.primary}
            placeholder="Enter text or tap the microphone to speak"
            showClear={sourceText}
            onClear={() => setSourceText("")}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            onLanguageChange={handleSourceLanguageChange}
            languages={languages}
            label="From"
          />

          <View style={styles.swapButtonContainer}>
            <IconButton
              icon="swap-vertical"
              size={24}
              onPress={swapLanguages}
              style={[
                styles.swapButton,
                { backgroundColor: colors.surfaceVariant },
              ]}
              iconColor={colors.onSurfaceVariant}
            />
          </View>

          <TranslationBox
            value={isTranslating ? "Translating..." : translatedText}
            callbackFn={handleSpeechSynthesis}
            isSource={false}
            icon={isProcessing ? "loading" : "volume-high"}
            iconColor={isProcessing ? colors.disabled : colors.onSurface}
            placeholder="Translation will appear here"
            editable={false}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            onLanguageChange={handleTargetLanguageChange}
            languages={languages.filter((lang) => lang.code !== sourceLanguage)}
            label="To"
          />
        </View>
      </View>

      <Phrasebook visible={showPhrasebook} setVisible={setShowPhrasebook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.sm,
    borderBottomWidth: 1,
  },
  languageSelectorContainer: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  swapButton: {
    margin: 0,
    borderRadius: 20,
  },
  phrasebookButton: {
    margin: 0,
    marginLeft: spacing.xs,
  },
  translatorContainer: {
    flex: 1,
  },
  translationBoxes: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  swapButtonContainer: {
    alignItems: "center",
    marginVertical: -spacing.sm,
    zIndex: 1,
  },
  swapButton: {
    elevation: 4,
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  dropdownContainer: {
    flex: 1,
  },
  phrasebookIcon: {
    margin: 0,
  },
});
