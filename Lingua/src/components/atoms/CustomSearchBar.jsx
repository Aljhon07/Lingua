import { TextInput, useTheme } from "react-native-paper"

export function CustomSearchBar({
  searchQuery,
  setSearchQuery,
  onSubmitEditing,
  placeholder,
  onClearSearch,
}) {
  const handleClearSearch = () => {
    setSearchQuery("")
    onClearSearch()
  }

  return (
    <TextInput
      placeholder={placeholder}
      inputMode="search"
      mode="outlined"
      dense={true}
      contentStyle={{ fontSize: 18 }}
      left={<TextInput.Icon disabled icon="magnify" />}
      right={
        searchQuery ? (
          <TextInput.Icon icon="close" onPress={handleClearSearch} />
        ) : null
      }
      onChangeText={setSearchQuery}
      value={searchQuery}
      onSubmitEditing={onSubmitEditing}
    />
  )
}
