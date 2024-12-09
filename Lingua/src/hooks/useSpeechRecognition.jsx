import { useAudioRecorder } from "expo-audio"
import { useEffect, useState } from "react"

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState("")
  const [recording, setRecording] = useState("")
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY)

  useEffect(() => {
    ;(async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync()
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied")
      }
    })()
  }, [])

  const handleTranscript = (e) => {
    setTranscript("")
  }

  const handleRecording = () => {}

  const handleSpeech = () => {}
  return {
    speaking,
    handleRecording,
    setIsSpeaking,
    transcript,
    handleTranscript,
  }
}
