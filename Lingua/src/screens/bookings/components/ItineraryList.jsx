import React, { useEffect } from "react"
import { View } from "react-native"
import { Button, Text } from "react-native-paper"
import { FlatList } from "react-native-gesture-handler"
import ItineraryDay from "./ItineraryDay"
import { useCustomItinerary } from "@context/CustomItineraryProvider"
import { patchUserItinerary } from "@services/directus/rest"
import { update } from "lodash"
import { CustomButton } from "@components/molecules/CustomButton"

export default function ItineraryList({ itinerary: data }) {
  console.log(data)
  const { booking: bookingId, id: userItineraryId, itinerary } = data
  const {
    editing,
    setEditing,
    setOriginal,
    setChanges,
    changes,
    original,
    saving,
    updateUserItinerary,
  } = useCustomItinerary()

  const sortedItinerary = [...itinerary].sort((a, b) => a.order - b.order)
  useEffect(() => {
    setOriginal({
      booking: bookingId,
      itinerary: sortedItinerary,
    })
    setChanges({
      booking: bookingId,
      itinerary: sortedItinerary,
    })
  }, [])
  const handlePress = async (localEditing) => {
    if (localEditing) {
      setEditing(true)
      setChanges(original)
      console.log("Editing")
    } else {
      updateUserItinerary(userItineraryId)
      setOriginal(changes)
    }
  }

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <FlatList
        data={sortedItinerary}
        keyExtractor={(item) => item.order.toString()}
        renderItem={({ item }) => (
          <ItineraryDay itinerary={item} isEditing={editing} />
        )}
      />
      <Button
        mode="contained"
        style={{ position: "absolute", bottom: 16, right: 16 }}
        onPress={() => handlePress(!editing)}
        loading={saving}
        icon={saving ? "" : editing ? "check" : "pencil"}
      >
        {saving ? "Saving..." : editing ? "Save" : "Edit"}
      </Button>
    </View>
  )
}
