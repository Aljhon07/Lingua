import React from "react"
import { Text, IconButton, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, View } from "react-native"
import { spacing } from "@constants/globalStyles"
import { useSpeechRecognition } from "@hooks/useSpeechRecognition"
import { useToggle } from "@hooks/useToggle"

export default function Translator() {
  const { colors } = useTheme()
  const [recording, toggleRecording] = useToggle(false)

  const styles = createStyles(colors)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text variant="bodyLarge" style={styles.transcript}>
          Transcript will appear here...
        </Text>
      </View>
      <View style={styles.wrapper}>
        <IconButton
          icon={recording ? "stop" : "microphone"}
          size={70}
          iconColor={colors.onPrimaryContainer}
          onPress={toggleRecording}
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
