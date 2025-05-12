import { View } from "react-native";
import SpeechRecog from "./SpeechRecog";
import { LanguageProvider } from "@context/LanguageProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { LanguageList } from "@components/atoms/LanguageList";
import Phrasebook from "./PhraseBook";

export default function Translator() {
  return (
    <LanguageProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <LanguageList />
          <Phrasebook />
        </View>

        <SpeechRecog />
      </SafeAreaView>
    </LanguageProvider>
  );
}
