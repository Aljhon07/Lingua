import React from "react"
import { Text, IconButton, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, View } from "react-native"
import { spacing } from "@constants/globalStyles"
import { useSpeechRecognition } from "@hooks/useSpeechRecognition"

export default function Translator() {
  const { colors } = useTheme()
  const { setIsSpeaking, speaking, handleRecording } = useSpeechRecognition()
  const styles = createStyles(colors)

  const handlePress = () => {
    setIsSpeaking(!speaking)
    const recording = handleRecording()
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text variant="bodyLarge" style={styles.transcript}>
          Transcript will appear here...
        </Text>
      </View>
      <View style={styles.wrapper}>
        <IconButton
          icon={speaking ? "stop" : "microphone"}
          size={70}
          iconColor={colors.onPrimaryContainer}
          onPress={handlePress}
          style={styles.microphoneIcon}
        />
      </View>
    </SafeAreaView>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      padding: spacing.lg,
    },
    wrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    transcript: {
      textAlign: "center",
    },
    microphoneIcon: {
      borderWidth: 1,
      borderColor: colors.primary,
      flex: 1,
      aspectRatio: 1,
      maxWidth: 200,
      maxHeight: 200,
      borderRadius: "100%",
    },
  })
