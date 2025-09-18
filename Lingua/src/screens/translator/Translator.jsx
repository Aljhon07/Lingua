import { StyleSheet, View, Animated, Keyboard } from "react-native";
import {
  IconButton,
  useTheme,
} from "react-native-paper";
import { useState, useEffect } from "react";
import { spacing } from "@constants/globalStyles";
import TranslationBox from "./components/TranslationBox";
import * as Speech from "expo-speech";
import Phrasebook from "./PhraseBook";
import { useLanguageContext } from "@context/LanguageProvider";
import { useSpeechRecognition } from "@hooks/useSpeechRecognition";
import { transcribeAudioDeepgram } from "@services/deepgram";
import { transcribeAudio } from "@services/speech";

export default function Translator() {
  const { languages, selectedLanguage, onSelectLanguage } =
    useLanguageContext();
  const [sourceText, setSourceText] = useState();
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState(
    "en"
  );
  const [targetLanguage, setTargetLanguage] = useState("ja");

  const handleSourceLanguageChange = (language) => {
    setSourceLanguage(language.code);
  };

  const handleTargetLanguageChange = (language) => {
    setTargetLanguage(language.code);
  };
  const [isTranslating, setIsTranslating] = useState(false);
  const [showPhrasebook, setShowPhrasebook] = useState(false);

  const {
    isRecording,
    isProcessing,
    transcript,
    handleRecord: handleSpeechRecognition,
  } = useSpeechRecognition();

  // Update source text when transcript changes
  useEffect(() => {
    if (transcript && transcript !== "Processing...") {
      console.log("Transcript received:", transcript);
      setSourceText(transcript);
    }
  }, [transcript]);

  const translateText = async (text) => {
    if (!text.trim()) {
      setTranslatedText("");
      return;
    }

    setIsTranslating(true);
    try {
      // TODO: Replace with your actual translation API call
      // const response = await yourTranslationAPI(text, sourceLanguage, targetLanguage);
      // setTranslatedText(response.translatedText);

      // Mock translation for now
      setTimeout(() => {
        setTranslatedText(`${sourceText}`);
        setIsTranslating(false);
      }, 500);
    } catch (error) {
      console.error("Translation error:", error);
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (sourceText !== "") {
        translateText(sourceText);
      } else {
        setTranslatedText("");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [sourceText]);

  const handleTextChange = (text) => {
    setSourceText(text);
  };

  const swapLanguages = () => {
    const newSource = targetLanguage;
    const newTarget = sourceLanguage;
    setSourceLanguage(newSource);
    setTargetLanguage(newTarget);
    setSourceText(translatedText);
    setTranslatedText(sourceText);

    const newSelectedLang = languages?.find((lang) => lang.code === newSource);
    if (newSelectedLang) {
      onSelectLanguage(newSelectedLang);
    }
  };

  const speakTranslatedText = () => {
    if (translatedText) {
      Speech.speak(translatedText, { language: targetLanguage });
    }
  };

  const handleTranscribe = () => {
    if (sourceLanguage == "en") {
      console.log(sourceLanguage)
      handleSpeechRecognition(transcribeAudio);
    } else {
      console.log("Using Deepgram")
      handleSpeechRecognition(transcribeAudioDeepgram);
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
            onSpeech={handleTranscribe}
            isSource={true}
            isRecording={isRecording}
            placeholder="Enter text or tap the microphone to speak"
            showClear={!!sourceText}
            onClear={() => setSourceText("")}
            sourceLanguage={sourceLanguage}
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
            onSpeech={speakTranslatedText}
            isSource={false}
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
