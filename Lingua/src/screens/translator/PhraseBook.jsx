import { LanguageList } from "@components/atoms/LanguageList";
import DataContainer from "@components/layouts/DataContainer";
import { useLanguageContext } from "@context/LanguageProvider";
import { useQueryState } from "@hooks/useQueryState";
import { fetchPhrases } from "@services/directus/rest";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Phrase from "./components/Phrase";

export default function Phrasebook() {
  const { selectedLanguage, onSelectLanguage, languages } =
    useLanguageContext();
  const { getQueryState, executeQuery } = useQueryState("phrasebook");
  const phraseState = getQueryState("phrasebook");

  useEffect(() => {
    const getPhrases = async () => {
      await executeQuery("phrasebook", fetchPhrases, {
        lang: selectedLanguage,
      });
    };
    getPhrases();
  }, [selectedLanguage]);
  return (
    <View style={{ flex: 1 }}>
      {languages && (
        <LanguageList
          languages={languages}
          onSelectLanguage={onSelectLanguage}
          selectedLanguage={selectedLanguage}
        />
      )}

      <DataContainer
        data={phraseState.data}
        isLoading={phraseState.isLoading}
        isError={phraseState.isError}
        error={phraseState.error}
        noDataMessage={"No phrases found"}
      >
        <FlatList
          data={phraseState.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Phrase
              english={item.phrase}
              translation={item.translation[0].translation}
            />
          )}
        />
      </DataContainer>
    </View>
  );
}
