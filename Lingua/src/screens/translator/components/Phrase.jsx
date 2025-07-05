import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { CustomButton } from "@components/molecules/CustomButton";
import { View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { cloudinary, directus } from "@constants/api";
import { usePlayback } from "@hooks/usePlayback";

export default function Phrase({ phrase, translation, translatedAudio }) {
  const audioUrl = `${cloudinary.audio}${translatedAudio}.mp3`;

  if (!translation) {
    return null;
  }

  const { playSound, isPlaying } = usePlayback(audioUrl);

  return (
    <CustomButton
      style={{ alignItems: "flex-start", flex: 1 }}
      icon={isPlaying ? "pause" : "volume-high"}
      onPress={playSound}
    >
      <View style={{ flex: 1, width: "100%" }}>
        <Text variant="labelLarge">{phrase}</Text>
        <Text variant="bodyMedium">{translation}</Text>
      </View>
    </CustomButton>
  );
}
