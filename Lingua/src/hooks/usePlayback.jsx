import { useEffect, useState } from "react"
import { Audio } from "expo-av"

export const usePlayback = (audioUrl) => {
  const [sound, setSound] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const playSound = async (playAudioUrl) => {
    audioUrl = audioUrl ? audioUrl : playAudioUrl
    setIsPlaying(true)
    console.log("Playing sound from URL: ", audioUrl)
    if (sound) {
      await sound.stopAsync()
      await sound.unloadAsync()
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      )
      setSound(newSound)

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false)
        }
      })
    } catch (error) {
      console.error("Audio playback error:", error)
      setIsPlaying(false)
    } finally {
    }
  }

  return {
    playSound,
    isPlaying,
  }
}
