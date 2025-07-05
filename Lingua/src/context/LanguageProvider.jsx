import { fetchLanguages } from "@services/directus/rest"
import { create } from "axios"
import { isLoading } from "expo-font"
import { createContext, useContext, useEffect, useState } from "react"

const LanuageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [languageCode, setLanguageCode] = useState({
    code: "ja",
    name: "Japanese",
  })
  const [languageList, setLanguageList] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getLanguages = async () => {
      try {
        const res = await fetchLanguages()
        console.log(JSON.stringify(res.data, null, 2))
        setLanguageList(res.data)
      } catch (error) {
        console.error("Error fetching languages:", error)
      }
    }

    getLanguages()
  }, [])

  const changeLanguage = (lang) => {
    console.log("Selected language:", lang)
    setLanguageCode(lang)
  }

  return (
    <LanuageContext.Provider
      value={{
        languages: languageList,
        selectedLanguage: languageCode,
        onSelectLanguage: changeLanguage,
        loading,
      }}
    >
      {children}
    </LanuageContext.Provider>
  )
}

export const useLanguageContext = () => useContext(LanuageContext)
