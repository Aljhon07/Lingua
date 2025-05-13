import { useLanguageContext } from "@context/LanguageProvider";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";

export function LanguageList({ label = "Select Language" }) {
  const { languages, onSelectLanguage, selectedLanguage } =
    useLanguageContext();

  if (!languages) {
    return <Text>Loading...</Text>;
  }

  return (
    <Dropdown
      mode="outlined"
      label={label}
      value={selectedLanguage?.code}
      options={languages.map((language) => ({
        label: language.name,
        value: language.code,
      }))}
      onSelect={(value) => {
        const filteredLanguage = languages.find(
          (language) => language.code === value
        );
        if (filteredLanguage) {
          onSelectLanguage(filteredLanguage);
        }
      }}
    />
  );
}
