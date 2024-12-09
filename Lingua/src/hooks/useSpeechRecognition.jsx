import { Audio } from "expo-av"
import { Alert } from "react-native"
import { useEffect, useState } from "react"

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState("")
  const [recording, setRecording] = useState("")
  const [sound, setSound] = useState(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Audio.requestPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Permission to access microphone was denied")
      }
    })()
  }, [])

  const startRecording = async () => {
    try {
      console.log("Starting recording...")
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      )
      setRecording(recording)
    } catch (error) {
      console.error("Failed to start recording", error)
    }
  }

  const stopRecording = async () => {
    try {
      console.log("Stopping recording...")
      setRecording(null)
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()
      console.log("Recording stopped and stored at", uri)
      setTranscript(uri)
    } catch (error) {
      console.error(error)
    }
  }

  const playRecording = async () => {
    try {
      console.log("Playing recording...")
      const { sound } = await Audio.Sound.createAsync({ uri: transcript })
      setSound(sound)
      await sound.playAsync()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    playRecording()
  }, [transcript])
  const handleRecording = async () => {
    if (recording) {
      await stopRecording()
    } else {
      await startRecording()
    }
  }

  return {
    handleRecording,
    transcript,
    recording,
    playRecording,
  }
}
