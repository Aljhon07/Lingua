import { StyleSheet, View, Animated, Keyboard } from "react-native"
import { Text, IconButton, ActivityIndicator, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState, useRef, useEffect } from "react"
import { spacing } from "@constants/globalStyles"
import TranslationBox from "./components/TranslationBox"
import * as Speech from 'expo-speech';
import { LANGUAGES } from './constants/languages';
import Phrasebook from "./PhraseBook"
import { LanguageList } from "@components/atoms/LanguageList";
import { useLanguageContext } from "@context/LanguageProvider";

export default function Translator() {
  const { languages, selectedLanguage, onSelectLanguage } = useLanguageContext();
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState(selectedLanguage?.code || 'en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  
  const handleSourceLanguageChange = (language) => {
    setSourceLanguage(language.code);
  };
  
  const handleTargetLanguageChange = (language) => {
    setTargetLanguage(language.code);
  };
  const [isListening, setIsListening] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showPhrasebook, setShowPhrasebook] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Initialize speech recognition
  useEffect(() => {
    const initSpeechRecognition = async () => {
      try {
        const { SpeechRecognition } = await import('expo-speech');
        setRecognition(SpeechRecognition);
      } catch (error) {
        console.error('Speech recognition not available', error);
      }
    };
    initSpeechRecognition();
  }, []);

  const handleSpeechRecognition = async () => {
    if (!recognition) return;

    try {
      if (isListening) {
        await recognition.stopListeningAsync();
        setIsListening(false);
        return;
      }

      setIsListening(true);
      const result = await recognition.recognizeAsync({
        language: sourceLanguage,
        onResult: (event) => {
          setSourceText(event.value[0]);
        },
      });
      
      if (result) {
        setSourceText(result[0]);
        translateText(result[0]);
      }
    } catch (error) {
      console.error('Speech recognition error:', error);
    } finally {
      setIsListening(false);
    }
  };

  const translateText = async (text) => {
    if (!text.trim()) {
      setTranslatedText('');
      return;
    }

    setIsTranslating(true);
    try {
      // TODO: Replace with your actual translation API call
      // const response = await yourTranslationAPI(text, sourceLanguage, targetLanguage);
      // setTranslatedText(response.translatedText);
      
      // Mock translation for now
      setTimeout(() => {
        setTranslatedText(`Translated: ${text} (${sourceLanguage} → ${targetLanguage})`);
        setIsTranslating(false);
      }, 500);
    } catch (error) {
      console.error('Translation error:', error);
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (sourceText !== '') {
        translateText(sourceText);
      } else {
        setTranslatedText('');
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
    
    // Update the selected language in the context
    const newSelectedLang = languages?.find(lang => lang.code === newSource);
    if (newSelectedLang) {
      onSelectLanguage(newSelectedLang);
    }
  };

  const speakTranslatedText = () => {
    if (translatedText) {
      Speech.speak(translatedText, { language: targetLanguage });
    }
  };

  const clearAll = () => {
    setSourceText('');
    setTranslatedText('');
  };

  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      

      <View style={styles.translatorContainer}>
        <View style={styles.translationBoxes}>
          <TranslationBox
            value={sourceText}
            onChangeText={handleTextChange}
            onSpeech={handleSpeechRecognition}
            isSource={true}
            placeholder="Enter text or tap the mic to speak"
            onClear={clearAll}
            showClear={true}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            onLanguageChange={handleSourceLanguageChange}
            languages={languages.filter(lang => lang.code !== targetLanguage)}
            label="From"
          />
          
          <View style={styles.swapButtonContainer}>
            <IconButton
              icon="swap-vertical"
              size={24}
              onPress={swapLanguages}
              style={[styles.swapButton, { backgroundColor: colors.surfaceVariant }]}
              iconColor={colors.onSurfaceVariant}
            />
          </View>

          <TranslationBox
            value={isTranslating ? 'Translating...' : translatedText}
            onSpeech={speakTranslatedText}
            isSource={false}
            placeholder="Translation will appear here"
            editable={false}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            onLanguageChange={handleTargetLanguageChange}
            languages={languages.filter(lang => lang.code !== sourceLanguage)}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    alignItems: 'center',
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
})
