import { useEffect, useState } from "react";
import { CustomButton } from "@components/molecules/CustomButton";
import { View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { cloudinary, directus } from "@constants/api";
import { Audio } from "expo-av";

export default function Phrase({ phrase, translation, translatedAudio }) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioUrl = `${cloudinary.audio}${translatedAudio}.mp3`;

  const playSound = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error("Audio playback error:", error);
    }
  };

  return (
    <CustomButton
      style={{ alignItems: "flex-start", flexDirection: "row" }}
      icon={isPlaying ? "pause" : "volume-high"}
      onPress={playSound}
    >
      <View>
        <Text variant="labelLarge">{phrase}</Text>
        <Text variant="bodyMedium">{translation}</Text>
      </View>
    </CustomButton>
  );
}
