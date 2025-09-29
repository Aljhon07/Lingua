import { useLanguageContext } from "@context/LanguageProvider";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { useState, useEffect } from "react";

export function LanguageList({
  label = "Select Language",
  hideMenuHeader = true,
  lang,
  callbackFn,
  isSource = false,
}) {
  const { languages, onSelectLanguage, selectedLanguage } =
    useLanguageContext();
  const [localValue, setLocalValue] = useState(lang);

  // Update localValue when the lang prop changes (e.g., during language swap)
  useEffect(() => {
    setLocalValue(lang);
  }, [lang]);

  // console.log(
  //   "Rendering LanguageList with lang: ",
  //   isSource ? "<Source Language>" : "<Target Language>",
  //   lang
  // )
  return (
    <Dropdown
      mode="outlined"
      label={label}
      value={localValue ? localValue : selectedLanguage?.code}
      hideMenuHeader={hideMenuHeader}
      options={languages.map((language) => ({
        label: language.name,
        value: language.code,
      }))}
      onSelect={(value) => {
        const filteredLanguage = languages.find(
          (language) => language.code === value
        );
        if (filteredLanguage) {
          if (lang) {
            console.log("Setting local value to", value);
            callbackFn(value);
            setLocalValue(value);
          } else {
            console.log("Setting selected language to", filteredLanguage);
            onSelectLanguage(filteredLanguage);
          }
        }
      }}
    />
  );
}
