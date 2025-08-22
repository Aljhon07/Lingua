import DataContainer from "@components/layouts/DataContainer";
import { spacing } from "@constants/globalStyles";
import { useQueryState } from "@hooks/useQueryState";
import { fetchVocabulary } from "@services/directus/rest";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { CustomButton } from "@components/molecules/CustomButton";
import { useLessonContext } from "@context/LessonProvider";
import { useLanguageContext } from "@context/LanguageProvider";
import { FlatList } from "react-native-gesture-handler";
import Vocabulary from "./components/Vocabulary";
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function VocabularyList({ id, title }) {
  const { colors, roundness } = useTheme();
  const styles = createStyles(colors, roundness);
  const { executeQuery, getQueryState } = useQueryState();
  const vocabulary = getQueryState("vocabulary");
  const { handleVocabList } = useLessonContext();
  const { selectedLanguage } = useLanguageContext();
  const navigation = useNavigation();
  const [shuffledData, setShuffledData] = useState([]);

  useEffect(() => {
    (async () => {
      await executeQuery("vocabulary", fetchVocabulary, {
        id,
        lang: selectedLanguage.code,
      });
    })();
  }, [selectedLanguage]);

  useEffect(() => {
    if (!vocabulary.error && !vocabulary.loading && vocabulary.data) {
      setShuffledData(_.shuffle(vocabulary.data));
      handleVocabList(vocabulary.data);
    }
  }, [vocabulary.data]);

  const handleQuizNavigation = () => {
    navigation.navigate("Quiz", { id, title });
  };

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      <DataContainer
        data={vocabulary.data}
        error={vocabulary.error}
        loading={vocabulary.loading}
      >
        <FlatList
          data={shuffledData}
          renderItem={(item) => {
            return <Vocabulary vocab={item.item} />;
          }}
        />
        <CustomButton primary onPress={handleQuizNavigation}>
          Take Quiz
        </CustomButton>
      </DataContainer>
    </View>
  );
}

const createStyles = (colors, roundness) => StyleSheet.create({});
