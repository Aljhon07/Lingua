import DataContainer from "@components/layouts/DataContainer"
import { useQueryState } from "@hooks/useQueryState"
import {
  createUserItinerary,
  fetchUserItinerary,
} from "@services/directus/rest"
import React, { use, useEffect } from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"
import ItineraryList from "./components/ItineraryList"
import CustomItineraryProvider from "@context/CustomItineraryProvider"

function CustomizeItinerary({ navigation, route }) {
  const { bookingId } = route.params
  const [creating, setCreating] = React.useState(false)
  const { getQueryState, executeQuery } = useQueryState()
  const {
    getQueryState: getCreateItineraryState,
    executeQuery: executeCreateItineraryQuery,
  } = useQueryState()
  const userItinerary = getQueryState("userItinerary")
  const createItineraryState = getCreateItineraryState("createItinerary")
  const itineraryQueryString = `filter[booking][_eq]=${bookingId}&fields=id,booking,itinerary.order,itinerary.id,itinerary.activity.id,itinerary.title,itinerary.activity.order,itinerary.activity.name,itinerary.activity.notes`
  useEffect(() => {
    ;(async () => {
      console.log("Executing Query...")
      const res = await executeQuery(
        "userItinerary",
        fetchUserItinerary,
        itineraryQueryString
      )
      if (res.length === 0) {
        setCreating(true)
        try {
          await executeCreateItineraryQuery(
            "createItinerary",
            createUserItinerary,
            bookingId
          )
          executeQuery(
            "userItinerary",
            fetchUserItinerary,
            itineraryQueryString
          )
        } catch (error) {
          console.log("Error creating itinerary:", error)
        }
      }
    })()
  }, [])

  if (creating && createItineraryState.loading) {
    return <Text>Creating Itinerary...</Text>
  }

  return (
    <CustomItineraryProvider>
      <View style={{ flex: 1 }}>
        <DataContainer
          loading={userItinerary.loading}
          error={userItinerary.error}
          data={userItinerary.data}
        >
          {userItinerary?.data?.length > 0 && (
            <ItineraryList
              itinerary={userItinerary.data[0]}
              bookingId={bookingId}
            />
          )}
        </DataContainer>
      </View>
    </CustomItineraryProvider>
  )
}

export default CustomizeItinerary
