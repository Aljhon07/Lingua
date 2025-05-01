import React, { useEffect, useState } from "react"
import { Text, IconButton, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, View } from "react-native"
import { spacing } from "@constants/globalStyles"
import { Audio } from "expo-av"
import * as FileSystem from "expo-file-system"
import { transcribeAudio } from "@services/speech"

export default function Translator() {
  const { colors } = useTheme()
  const [recording, setRecording] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState(null)
  const [sound, setSound] = useState(null)
  const styles = createStyles(colors)

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Audio.requestPermissionsAsync()
      setHasPermission(status === "granted")

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      })
    }

    requestPermission()

    return () => {
      if (recording) {
        stopRecording()
      }
    }
  }, [])

  const startRecording = async () => {
    const recordingOptions = {
      android: {
        extension: ".wav",
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 128000,
      },
      ios: {
        extension: ".wav",
        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 16000,
        numberOfChannels: 1,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
    }
    try {
      setIsProcessing(true)
      setTranscript("Listening...")

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      )

      setRecording(newRecording)
      setIsRecording(true)
      setIsProcessing(false)
    } catch (error) {
      console.error("Failed to start recording", error)
      setTranscript("Failed to start recording")
      setIsProcessing(false)
    }
  }

  const stopRecording = async () => {
    if (!recording) return
    console.log("Stopping recording...")
    setIsProcessing(true)
    setTranscript("Processing...")

    try {
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()

      if (!uri) {
        throw new Error("No recording URI found")
      }

      const info = await FileSystem.getInfoAsync(uri, { size: true })
      console.log("Recording info:", info)
      const { data } = await transcribeAudio(uri)
      setTranscript(data.transcript || "No speech detected")
    } catch (error) {
      console.error("Failed to process recording", error)
      setTranscript("Error processing audio")
    } finally {
      setRecording(null)
      setIsRecording(false)
      setIsProcessing(false)
    }
  }
  async function playSound() {
    console.log("Loading Sound")
    const { sound } = await Audio.Sound.createAsync(
      { uri: recording.getURI() },
      { isLooping: false, shouldPlay: true }
    )

    console.log("Playing Sound")
    await sound.playAsync()
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        console.log("Playback finished")
        sound.unloadAsync()
      }
    })
  }
  const handleRecord = async () => {
    if (isProcessing) return

    if (isRecording) {
      await stopRecording()
    } else {
      await startRecording()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text variant="bodyLarge" style={styles.transcript}>
          {isRecording
            ? "Recording..."
            : transcript || "Press the button to start recording"}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <IconButton
          icon={isRecording ? "stop" : "microphone"}
          size={70}
          iconColor={colors.onPrimaryContainer}
          onPress={handleRecord}
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
