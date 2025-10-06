import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "@constants/globalStyles";
import { LessonCard } from "./components/LessonCard";
import { useQueryState } from "@hooks/useQueryState";
import DataContainer from "@components/layouts/DataContainer";
import { fetchLessons } from "@services/directus/rest";
import { Text } from "react-native-paper";
import { LanguageList } from "@components/atoms/LanguageList";
import { useLanguageContext } from "@context/LanguageProvider";
import { useNavigation } from "@react-navigation/native";
import { useUserProgressContext } from "@context/UserProgressProvider";

export function LessonListWrapper() {
  return <LessonList />;
}

export default function LessonList() {
  const navigation = useNavigation();
  const { getQueryState, executeQuery } = useQueryState();

  const { userProgress, getUserProgress, lessonProgressState } =
    useUserProgressContext();
  const styles = createStyles();
  const lesson = getQueryState("lesson");

  const { selectedLanguage } = useLanguageContext();

  useEffect(() => {
    fetchLessonDetails();
    getUserProgress();
  }, []);

  const fetchLessonDetails = async () => {
    executeQuery("lesson", fetchLessons);
  };

  const tryAgainComponent = (
    <View style={{ marginBottom: spacing.lg }}>
      <Text style={{ textAlign: "center", marginBottom: spacing.md }}>
        Unable to fetch lessons. Please check your connection.
      </Text>
      <Text
        style={{ textAlign: "center", color: "blue" }}
        onPress={() => {
          executeQuery("lesson", fetchLessons);
        }}
      >
        Try Again
      </Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text
        variant="headlineLarge"
        style={{ textAlign: "center", marginBottom: spacing.lg }}
      >
        Every Lesson Brings You Closer to Fluency
      </Text>
      <DataContainer
        loading={lesson.loading && lessonProgressState.loading}
        error={lesson.error || lessonProgressState.error}
        data={lesson.data}
        noDataMessage={"No Lessons Found"}
        errorMessage={"Error Fetching Lessons"}
        errorComponent={tryAgainComponent}
      >
        <LanguageList />
        <FlatList
          data={lesson.data}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={lesson.loading}
              onRefresh={() => {
                executeQuery("lesson", fetchLessons);
                getUserProgress();
              }}
            />
          }
          renderItem={({ item }) => (
            <LessonCard
              title={`${item.name}`}
              selectedLanguage={selectedLanguage}
              id={item.id}
              description={item.description}
            />
          )}
          style={{ flex: 1, marginTop: spacing.md }}
          showsVerticalScrollIndicator={false}
        />
      </DataContainer>
    </SafeAreaView>
  );
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
    },
  });
