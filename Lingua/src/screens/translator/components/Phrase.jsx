import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { CustomButton } from "@components/molecules/CustomButton";
import { View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { cloudinary, directus, server } from "@constants/api";
import { usePlayback } from "@hooks/usePlayback";
import { synthesizeText } from "@services/speech";

export default function Phrase({
  phrase,
  translation,
  translatedAudio,
  selectedLanguage,
}) {
  const [audioUrl, setAudioUrl] = useState(null);
  const { playSound, isPlaying } = usePlayback();

  useEffect(() => {
    if (translatedAudio) {
      setAudioUrl(`${cloudinary.audio}${translatedAudio}.mp3`);
    } else {
      handleSynthesize();
    }
  }, []);

  const handleSynthesize = async () => {
    const audio = await synthesizeText(translation, selectedLanguage.code);
    console.log(audio);
    if (audio) {
      const audioLink = `${server.output}${audio}`;
      setAudioUrl(audioLink);
    }
  };
  if (!translation) {
    return null;
  }
  return (
    <CustomButton
      style={{ alignItems: "flex-start", flex: 1 }}
      icon={isPlaying ? "pause" : "volume-high"}
      onPress={() => playSound(audioUrl)}
    >
      <View style={{ flex: 1, width: "100%" }}>
        <Text variant="labelLarge">{phrase}</Text>
        <Text variant="bodyMedium">{translation}</Text>
      </View>
    </CustomButton>
  );
}
