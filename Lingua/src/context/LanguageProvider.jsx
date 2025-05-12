import { fetchLanguages } from "@services/directus/rest";
import { create } from "axios";
import { isLoading } from "expo-font";
import { createContext, useContext, useEffect, useState } from "react";

const LanuageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [languageCode, setLanguageCode] = useState("ja");
  const [languageList, setLanguageList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getLanguages = async () => {
      try {
        const res = await fetchLanguages();
        console.log(JSON.stringify(res.data, null, 2));
        setLanguageList(res.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    getLanguages();
  }, []);

  const changeLanguage = (lang) => {
    setLanguageCode(lang);
  };

  return (
    <LanuageContext.Provider
      value={{
        languages: languageList, // Renamed for consistency
        selectedLanguage: languageCode, // Renamed for consistency
        onSelectLanguage: changeLanguage, // Renamed for consistency
        loading,
      }}
    >
      {children}
    </LanuageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanuageContext);
