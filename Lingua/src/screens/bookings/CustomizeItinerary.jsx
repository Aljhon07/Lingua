import DataContainer from "@components/layouts/DataContainer"
import { useQueryState } from "@hooks/useQueryState"
import {
  createUserItinerary,
  fetchUserItinerary,
} from "@services/directus/rest"
import { set } from "lodash"
import React, { use, useEffect } from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"

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
  const itineraryQueryString = `filter[booking][_eq]=${bookingId}&fields=booking,itinerary.order,itinerary.title,itinerary.activity.order,itinerary.activity.name,itinerary.activity.notes`
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

  console.log(
    "User Itinerary State:",
    JSON.stringify(userItinerary.data, null, 2)
  )
  if (creating && createItineraryState.loading) {
    return <Text>Creating Itinerary...</Text>
  }

  return (
    <DataContainer
      loading={userItinerary.loading}
      error={userItinerary.error}
      data={userItinerary.data}
    ></DataContainer>
  )
}

export default CustomizeItinerary
