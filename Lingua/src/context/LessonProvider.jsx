import React, { createContext, useContext, useState } from "react";

export const LessonContext = createContext();

export default function LessonProvider({ children, id }) {
  const [vocabList, setVocabList] = useState([]);
  const [language, setLanguage] = useState("ja");
  const [lessonId, setLessonId] = useState(null);
  const handleVocabList = (vocab) => {
    setVocabList(vocab);
  };

  return (
    <LessonContext.Provider
      value={{
        vocabList,
        lessonId,
        setLessonId,
        handleVocabList,
        language,
        setLanguage,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
}

export const useLessonContext = () => useContext(LessonContext);
