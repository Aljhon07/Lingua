import React, { useEffect, useState } from "react"
import { Text, IconButton, useTheme, TextInput } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { spacing } from "@constants/globalStyles"
import { useSpeechRecognition } from "@hooks/useSpeechRecognition"

export default function SpeechRecog({ inputMode }) {
  const { colors } = useTheme()
  const { handleRecord, isRecording, transcript } = useSpeechRecognition()
  const [textInput, setTextInput] = useState("")
  const styles = createStyles(colors)

  // Preserve text when switching modes
  const currentText = inputMode === "speech" ? transcript : textInput

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text variant="bodyLarge" style={styles.transcript}>
          {inputMode === "speech"
            ? isRecording
              ? "Listening..."
              : transcript || "Press the button to start recording"
            : textInput || "Type your message below"}
        </Text>
      </View>

      {inputMode === "speech" ? (
        <View style={styles.wrapper}>
          <IconButton
            icon={isRecording ? "stop" : "microphone"}
            size={70}
            iconColor={colors.primary}
            onPress={handleRecord}
            style={styles.microphoneIcon}
          />
        </View>
      ) : (
        <View style={styles.textInputWrapper}>
          <TextInput
            mode="outlined"
            placeholder="Type your message here..."
            value={textInput}
            onChangeText={setTextInput}
            multiline
            style={styles.textInput}
          />
        </View>
      )}
    </View>
  )
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
    },
    wrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    textInputWrapper: {
      flex: 1,
      justifyContent: "flex-end",
      paddingBottom: spacing.lg,
    },
    transcript: {
      textAlign: "center",
    },
    textInput: {
      minHeight: 100,
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
