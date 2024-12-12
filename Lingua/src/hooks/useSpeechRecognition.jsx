import { useState } from "react"
import { Audio } from "expo-av"
import { useEffect } from "react"
export const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState("")
  const [recodring, setRecording] = useState(false)

  useEffect(() => {
    ;async () => {
      try {
        const status = await Audio.getPermissionsAsync()
        console.log(status)
      } catch (error) {
        console.log(error)
      }
    }
  })

  const startRecording = () => {
    const recording = new Audio.Recording()
  }
}
