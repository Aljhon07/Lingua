import { useQueryState } from "@hooks/useQueryState";
import {
  fetchUserProgress,
  patchUserProgress,
  postUserProgress,
} from "@services/directus/rest";
import React, { createContext, useContext, useEffect, useState } from "react";

export const UserProgressContext = createContext();

export default function UserProgressProvider({ children, id }) {
  const [userProgress, setUserProgress] = useState(null);
  const { getQueryState, executeQuery } = useQueryState();
  const lessonProgressState = getQueryState("lessonProgress");
  const getUserProgress = async () => {
    const res = await executeQuery("lessonProgress", fetchUserProgress);
    console.log("User Provider:", res);
    setUserProgress(res);
  };

  const findUserProgressByLessonId = (lessonId, language) => {
    console.log(!userProgress, lessonId);
    if (!userProgress || !Array.isArray(userProgress)) return null;
    console.log("Finding from: ", userProgress);
    return userProgress.find(
      (progress) => progress.lesson && progress.lesson === lessonId
    );
  };

  const updateUserProgress = async ({ lessonId, score, language }) => {
    const existingProgress = findUserProgressByLessonId(lessonId, language);

    if (existingProgress) {
      existingProgress.recent_score = score;
      setUserProgress((prev) =>
        prev.map((progress) =>
          progress.lesson === lessonId ? existingProgress : progress
        )
      );
      await patchUserProgress({
        progressId: existingProgress.id,
        recent_score: score,
        language: language,
      });
    } else {
      createUserProgress(lessonId, score);
    }
  };

  const createUserProgress = (lessonId, score) => {
    console.log("Creating new user progress for lesson:", lessonId);
    const newProgress = {
      lesson: lessonId,
      recent_score: score,
    };
    setUserProgress((prev) => [...(prev || []), newProgress]);

    const res = postUserProgress(newProgress);
  };
  return (
    <UserProgressContext.Provider
      value={{
        userProgress,
        getUserProgress,
        lessonProgressState,
        findUserProgressByLessonId,
        updateUserProgress,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
}

export const useUserProgressContext = () => useContext(UserProgressContext);
