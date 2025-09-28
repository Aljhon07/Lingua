import { LanguageList } from "@components/atoms/LanguageList"
import DataContainer from "@components/layouts/DataContainer"
import { useLanguageContext } from "@context/LanguageProvider"
import { useQueryState } from "@hooks/useQueryState"
import { fetchPhrases } from "@services/directus/rest"
import React, { useEffect } from "react"
import Phrase from "./components/Phrase"
import {
  FlatList,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native"
import { CustomButton } from "@components/molecules/CustomButton"
import { Text, useTheme, Portal } from "react-native-paper"
import { usePhrasebook } from "@context/PhrasebookProvider"

export default function Phrasebook() {
  const { selectedLanguage } = useLanguageContext()
  const { showPhrasebook, setShowPhrasebook } = usePhrasebook()
  const { colors } = useTheme()
  const { getQueryState, executeQuery } = useQueryState("phrasebook")
  const phraseState = getQueryState("phrasebook")

  useEffect(() => {
    if (showPhrasebook) {
      const getPhrases = async () => {
        await executeQuery("phrasebook", fetchPhrases, {
          lang: selectedLanguage.code,
        })
      }
      getPhrases()
    }
  }, [selectedLanguage, showPhrasebook])

  if (!showPhrasebook) return null

  return (
    <Portal>
      <View style={styles.wrapper}>
        {/* Dark overlay */}
        <TouchableWithoutFeedback onPress={() => setShowPhrasebook(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        {/* Centered modal content */}
        <View
          style={[
            styles.container,
            { backgroundColor: colors.surface, maxHeight: "90%" },
          ]}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <DataContainer
              data={phraseState.data}
              isLoading={phraseState.isLoading}
              isError={phraseState.isError}
              error={phraseState.error}
              noDataMessage={"No phrases found"}
            >
              <LanguageList hideMenuHeader={false} />
              <FlatList
                data={phraseState.data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Phrase
                    phrase={item.phrase}
                    translation={item.translation[0]?.translation}
                    translatedAudio={item.translation[0]?.audio}
                  />
                )}
                style={{ marginVertical: 8 }}
                scrollEnabled={false} // Scroll handled by parent ScrollView
              />
            </DataContainer>

            <CustomButton
              style={{ backgroundColor: colors.errorContainer, marginTop: 8 }}
              onPress={() => setShowPhrasebook(false)}
            >
              <Text>Close</Text>
            </CustomButton>
          </ScrollView>
        </View>
      </View>
    </Portal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    width: "90%",
    padding: 16,
    borderRadius: 12,
    zIndex: 1000,
  },
})
