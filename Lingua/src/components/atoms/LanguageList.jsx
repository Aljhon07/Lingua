import { useLanguageContext } from "@context/LanguageProvider";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { useState } from "react";

export function LanguageList({
  label = "Select Language",
  hideMenuHeader = true,
  lang
}) {
  const { languages, onSelectLanguage, selectedLanguage } =
    useLanguageContext();
  const [localValue, setLocalValue] = useState(lang);
  if (!languages) {
    return <Text>Loading...</Text>;
  }


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
          if (localValue) {
            console.log("Setting local value to", value);
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
