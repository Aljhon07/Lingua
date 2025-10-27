import {
  fetchLanguages,
  fetchLatestPaidBookingLanguage,
} from "@services/directus/rest";
import { create } from "axios";
import { isLoading } from "expo-font";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthProvider";

const LanuageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const [languageCode, setLanguageCode] = useState({
    code: "ja",
    name: "Japanese",
  });
  const [languageList, setLanguageList] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeLanguages = async () => {
      try {
        // First fetch the languages list
        const res = await fetchLanguages();
        setLanguageList(res.data);

        // Only check for latest paid booking language if user is authenticated
        if (isAuthenticated) {
          console.log(
            "User is authenticated, checking for latest paid booking language..."
          );
          const bookingLanguage = await fetchLatestPaidBookingLanguage();
          console.log("Latest paid booking language:", bookingLanguage);

          if (bookingLanguage && bookingLanguage.code && res.data) {
            // Find the language object that matches the booking language
            const matchingLanguage = res.data.find(
              (lang) => lang.code === bookingLanguage.code
            );
            if (matchingLanguage) {
              console.log(
                "Auto-setting language from latest paid booking:",
                matchingLanguage
              );
              setLanguageCode(matchingLanguage);
            }
          }
        } else {
          console.log("User not authenticated, skipping booking language sync");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error initializing languages:", error);
        setLoading(false);
      }
    };

    initializeLanguages();
  }, [isAuthenticated]); // Add isAuthenticated as dependency

  const changeLanguage = (lang) => {
    console.log("Selected language:", lang);
    setLanguageCode(lang);
  };

  const syncLanguageFromBooking = async () => {
    try {
      // Only sync if user is authenticated
      if (!isAuthenticated) {
        console.log("User not authenticated, skipping booking language sync");
        return false;
      }

      console.log("Syncing language from latest paid booking...");
      const bookingLanguage = await fetchLatestPaidBookingLanguage();

      if (bookingLanguage && bookingLanguage.code && languageList.length > 0) {
        const matchingLanguage = languageList.find(
          (lang) => lang.code === bookingLanguage.code
        );
        if (matchingLanguage && matchingLanguage.code !== languageCode.code) {
          console.log("Updating language from paid booking:", matchingLanguage);
          setLanguageCode(matchingLanguage);
          return true; // Language was updated
        }
      }
      return false; // No language update needed
    } catch (error) {
      console.error("Error syncing language from booking:", error);
      return false;
    }
  };

  return (
    <LanuageContext.Provider
      value={{
        languages: languageList,
        selectedLanguage: languageCode,
        onSelectLanguage: changeLanguage,
        syncLanguageFromBooking,
        loading,
      }}
    >
      {children}
    </LanuageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanuageContext);
