import React, { useEffect } from "react"
import { Text, IconButton, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, View } from "react-native"
import { spacing } from "@constants/globalStyles"
import { useToggle } from "@hooks/useToggle"
import * as FileSystem from "expo-file-system"
export default function Translator() {
  const { colors } = useTheme()
  const [recording, toggleRecording] = useToggle(false)

  const styles = createStyles(colors)

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.164.188:2700")

    socket.onopen = async () => {
      console.log("WebSocket Connected")
      const fileData = await FileSystem.readAsStringAsync(
        "../../../assets/audio/converted_test.wav",
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      )

      console.log("FIle Legnth :", ileData.length)
      const chunkSize = 4096
      for (let i = 0; i < fileData.length; i += chunkSize) {
        console.log("a")
        const chunk = fileData.slice(i, i + chunkSize)
        socket.send(Buffer.from(chunk, "base64"))
      }
      webSocket.send(JSON.stringify({ eou: true }))
      console.log("File sent successfully.")
    }
  }, [])

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
