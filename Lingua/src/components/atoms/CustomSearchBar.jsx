import { TextInput, useTheme } from "react-native-paper"

export function CustomSearchBar({ searchQuery, setSearchQuery }) {
  const { colors } = useTheme()
  return (
    <TextInput
      placeholder="Search"
      inputMode="search"
      mode="outlined"
      dense={true}
      contentStyle={{ fontSize: 18 }}
      left={<TextInput.Icon disabled icon="magnify" />}
      right={
        searchQuery ? (
          <TextInput.Icon icon="close" onPress={() => setSearchQuery("")} />
        ) : null
      }
      onChangeText={setSearchQuery}
      value={searchQuery}
      onSubmitEditing={() => console.log("Search softkey pressed!")}
    />
  )
}
