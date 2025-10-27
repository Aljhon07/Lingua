import { StyleSheet, View, Animated, Keyboard } from "react-native";
import { IconButton, useTheme, Text } from "react-native-paper";
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
import { synthesizeText, translateText as translate } from "@services/speech";
import { ScrollView } from "react-native-gesture-handler";
import { server } from "@constants/api";
export default function Translator() {
  const { languages, selectedLanguage, onSelectLanguage } =
    useLanguageContext();
  const { profile } = useProfileContext();
  const [sourceText, setSourceText] = useState();
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState(
    selectedLanguage?.code || "ja"
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const [showPhrasebook, setShowPhrasebook] = useState(false);

  console.log(
    "Translator render - selectedLanguage:",
    selectedLanguage,
    "targetLanguage:",
    targetLanguage
  );

  const { isRecording, isProcessing, transcript, handleRecord } =
    useSpeechRecognition(profile?.id);

  const { audioUrl, handleSynthesize } = useSpeechSynthesis();

  const { playSound, isPlaying } = usePlayback();

  // Sync target language with global language context changes
  useEffect(() => {
    console.log(
      "Language sync useEffect - selectedLanguage:",
      selectedLanguage,
      "targetLanguage:",
      targetLanguage
    );
    if (selectedLanguage?.code && selectedLanguage.code !== targetLanguage) {
      console.log(
        "Syncing target language from",
        targetLanguage,
        "to",
        selectedLanguage.code
      );
      setTargetLanguage(selectedLanguage.code);

      // If there's existing source text, re-translate it with the new target language
      if (
        sourceText &&
        sourceText.trim() &&
        sourceText !== "No transcription."
      ) {
        console.log(
          "Re-translating existing text with new target language:",
          selectedLanguage.code
        );
        translateText(sourceText, sourceLanguage, selectedLanguage.code);
      }
    }
  }, [selectedLanguage?.code]);

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

  const translateText = async (
    text,
    customSourceLang = null,
    customTargetLang = null
  ) => {
    if (!text.trim()) {
      setTranslatedText("");
      setIsTranslating(false);
      return;
    }

    setIsTranslating(true);
    try {
      const fromLang = customSourceLang || sourceLanguage;
      const toLang = customTargetLang || targetLanguage;

      const response = await translate(text, {
        from: fromLang,
        to: toLang,
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
      // Trigger translation with the new source language
      if (sourceText && sourceText.trim()) {
        translateText(sourceText, langCode, targetLanguage);
      }
    }
  };

  const handleTargetLanguageChange = (language) => {
    const langCode = typeof language === "string" ? language : language?.code;
    console.log(`Change tgt: ${langCode}`);
    if (langCode) {
      setTargetLanguage(langCode);

      // Update the global language context to sync with language learning
      if (typeof language === "object" && language?.code && language?.name) {
        onSelectLanguage(language);
      } else if (typeof language === "string") {
        // Find the language object from the languages list
        const languageObj = languages.find((lang) => lang.code === language);
        if (languageObj) {
          onSelectLanguage(languageObj);
        }
      }

      // Trigger translation with the new target language
      if (sourceText && sourceText.trim()) {
        translateText(sourceText, sourceLanguage, langCode);
      }
    }
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

    // Update global language context with the new target language
    const newTargetLanguageObj = languages.find(
      (lang) => lang.code === currentSourceLanguage
    );
    if (newTargetLanguageObj) {
      onSelectLanguage(newTargetLanguageObj);
    }

    // Swap the text content - what was translated becomes the new source
    // and what was source becomes the new translated text
    setSourceText(currentTranslatedText);
    setTranslatedText(currentSourceText);

    // console.log("Languages swapped:", {
    //   newSource: currentTargetLanguage,
    //   newTarget: currentSourceLanguage,
    //   newSourceText: currentTranslatedText,
    //   newTranslatedText: currentSourceText,
    // })
  };

  const speakTranslatedText = async () => {
    console.log("Speak text:", translatedText);
    const audioName = await synthesizeText(translatedText, targetLanguage);
    console.log(audioName);
    const audioUrl = `${server.output}/${audioName}`;
    console.log(audioUrl);
    if (audioName) {
      playSound(audioUrl);
    }
  };

  const clearAll = () => {
    setSourceText("");
    setTranslatedText("");
  };

  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
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

          <Text style={[styles.speechTip, { color: colors.onSurfaceVariant }]}>
            Tip: Speak clearly near your mic in a quiet space if possible for
            best accuracy.
          </Text>

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
            callbackFn={speakTranslatedText}
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
            isPlaying={isPlaying}
          />
        </View>
      </View>

      <Phrasebook visible={showPhrasebook} setVisible={setShowPhrasebook} />
    </ScrollView>
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
  speechTip: {
    fontSize: 12,
    textAlign: "center",
    marginTop: -spacing.md,
    marginBottom: spacing.sm,
    fontStyle: "italic",
    paddingHorizontal: spacing.md,
  },
});
