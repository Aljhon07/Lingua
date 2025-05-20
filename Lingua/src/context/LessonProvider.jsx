import React, { createContext, useContext, useState } from "react";

export const LessonContext = createContext();

export default function LessonProvider({ children }) {
  const [vocabList, setVocabList] = useState([]);
  const [language, setLanguage] = useState("ja");

  const handleVocabList = (vocab) => {
    setVocabList(vocab);
    console.log("Provider: ", vocab);
  };

  return (
    <LessonContext.Provider
      value={{
        vocabList,
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
