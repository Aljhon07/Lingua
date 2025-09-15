import { LanguageList } from "@components/atoms/LanguageList"
import DataContainer from "@components/layouts/DataContainer"
import { useLanguageContext } from "@context/LanguageProvider"
import { useQueryState } from "@hooks/useQueryState"
import { fetchPhrases } from "@services/directus/rest"
import React, { useEffect, useState } from "react"
import Phrase from "./components/Phrase"
import { FlatList } from "react-native"
import Modal from "react-native-modal"
import { CustomButton } from "@components/molecules/CustomButton"
import { Text, useTheme } from "react-native-paper"
import StyledSurface from "@components/atoms/StyledSurface"
import { usePhrasebook } from "@context/PhrasebookProvider"

export default function Phrasebook({ visible, setVisible }) {
  const { selectedLanguage } = useLanguageContext()
  const { showPhrasebook, setShowPhrasebook } = usePhrasebook()
  const { colors } = useTheme()
  const { getQueryState, executeQuery } = useQueryState("phrasebook")
  const phraseState = getQueryState("phrasebook")

  useEffect(() => {
    const getPhrases = async () => {
      await executeQuery("phrasebook", fetchPhrases, {
        lang: selectedLanguage.code,
      })
    }
    getPhrases()
  }, [selectedLanguage])

  return (
    <Modal visible={showPhrasebook}>
      <DataContainer
        data={phraseState.data}
        isLoading={phraseState.isLoading}
        isError={phraseState.isError}
        error={phraseState.error}
        noDataMessage={"No phrases found"}
      >
        <StyledSurface>
          <FlatList
            data={phraseState.data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              console.log("Item: ", JSON.stringify(item, null, 2)),
              (
                <Phrase
                  phrase={item.phrase}
                  translation={item.translation[0]?.translation}
                  translatedAudio={item.translation[0]?.audio}
                />
              )
            )}
          />
          <CustomButton
            style={{
              backgroundColor: colors.errorContainer,
            }}
            onPress={() => setShowPhrasebook(false)}
          >
            <Text>Close</Text>
          </CustomButton>
        </StyledSurface>
      </DataContainer>
    </Modal>
  )
}
