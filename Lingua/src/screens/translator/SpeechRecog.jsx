import React, { useEffect, useState } from "react";
import { Text, IconButton, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Linking, StyleSheet, View, Platform, Alert } from "react-native";
import { spacing } from "@constants/globalStyles";
import { useSpeechRecognition } from "@hooks/useSpeechRecognition";

export default function SpeechRecog() {
  const { colors } = useTheme();
  const { handleRecord, isRecording, transcript } = useSpeechRecognition();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text variant="bodyLarge" style={styles.transcript}>
          {isRecording
            ? "Listening..."
            : transcript || "Press the button to start recording"}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <IconButton
          icon={isRecording ? "stop" : "microphone"}
          size={70}
          iconColor={colors.primary}
          onPress={handleRecord}
          style={styles.microphoneIcon}
        />
      </View>
    </View>
  );
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
  });
