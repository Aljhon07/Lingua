import { StyleSheet, View, Animated } from "react-native"
import { Button, IconButton } from "react-native-paper"
import SpeechRecog from "./SpeechRecog"
import { SafeAreaView } from "react-native-safe-area-context"
import { LanguageList } from "@components/atoms/LanguageList"
import Phrasebook from "./PhraseBook"
import { useState, useRef, useEffect } from "react"
import { spacing } from "@constants/globalStyles"
import { CustomButton } from "@components/molecules/CustomButton"

export default function Translator() {
  const [visible, setVisible] = useState(false)
  const [inputMode, setInputMode] = useState("speech") // "speech" or "text"
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start()
    }
  }, [visible, fadeAnim])

  return (
    <SafeAreaView style={styles.container}>
      {visible && (
        <Animated.View
          style={[
            styles.dimmer,
            {
              opacity: fadeAnim,
            },
          ]}
        />
      )}
      <View style={styles.buttonGroup}>
        <View style={styles.dropdownContainer}>
          <LanguageList label="Translate to" />
        </View>
        <IconButton
          icon="book-open-variant"
          size={24}
          onPress={() => setVisible(true)}
          style={styles.phrasebookIcon}
        />
      </View>
      <SpeechRecog inputMode={inputMode} />
      <View style={styles.modeToggle}>
        <CustomButton
          primary={inputMode === "speech"}
          onPress={() => setInputMode("speech")}
          style={styles.toggleButton}
        >
          Speech
        </CustomButton>
        <CustomButton
          primary={inputMode === "text"}
          onPress={() => setInputMode("text")}
          style={styles.toggleButton}
        >
          Text
        </CustomButton>
      </View>
      <Phrasebook visible={visible} setVisible={setVisible} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  dimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  modeToggle: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  toggleButton: {
    flex: 1,
    maxWidth: 120,
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
