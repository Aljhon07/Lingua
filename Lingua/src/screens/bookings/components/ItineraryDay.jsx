import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import DraggableFlatList from "react-native-draggable-flatlist"
import { Text, Surface, useTheme, Button } from "react-native-paper"
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler"
import { spacing } from "@constants/globalStyles"
import ItineraryActivity from "./ItineraryActivity"
import StyledSurface from "@components/atoms/StyledSurface"
import { useCustomItinerary } from "@context/CustomItineraryProvider"

function ItineraryDay({ itinerary, onActivitiesReorder, isEditing }) {
  const { colors, roundness } = useTheme()
  const { handleChanges, changes } = useCustomItinerary()
  const {
    title,
    activity: activities,
    id: itineraryId,
    order: dayNumber,
  } = itinerary

  const styles = createStyles(colors, roundness)
  const [data, setData] = useState(activities.sort((a, b) => a.order - b.order))

  const handleDragEnd = ({ data: newData }) => {
    const updatedData = newData.map((item, index) => ({
      ...item,
      order: index,
    }))

    const reorderedItinerary = changes.itinerary.map((it) =>
      it.id == itineraryId ? { ...it, activity: updatedData } : it
    )
    handleChanges({
      ...changes,
      itinerary: reorderedItinerary,
    })
    setData(updatedData)
  }

  const addActivity = () => {
    const newActivity = {
      name: "New Activity",
      order: data.length,
    }

    setData((prevData) => [...prevData, newActivity])

    const newChanges = {
      ...changes,
      itinerary: changes.itinerary.map((it, idx) =>
        it.id === itineraryId
          ? { ...it, activity: [...it.activity, newActivity] }
          : it
      ),
    }
    handleChanges(newChanges)
  }

  const removeActivity = (activityId) => {
    setData((prevData) => prevData.filter((act) => act.id !== activityId))
    const newChanges = {
      ...changes,
      itinerary: changes.itinerary.map((it) =>
        it.id === itineraryId
          ? {
              ...it,
              activity: it.activity.filter((act) => act.id !== activityId),
            }
          : it
      ),
    }
    handleChanges(newChanges)
  }

  const handleActivityChange = (updatedActivity) => {
    const updatedData = data.map((act) =>
      act.id === updatedActivity.id ? updatedActivity : act
    )
    setData(updatedData)

    const newChanges = {
      ...changes,
      itinerary: changes.itinerary.map((it) =>
        it.id === itineraryId
          ? {
              ...it,
              activity: it.activity.map((act) =>
                act.id === updatedActivity.id ? updatedActivity : act
              ),
            }
          : it
      ),
    }

    handleChanges(newChanges)
  }
  return (
    <StyledSurface style={styles.cardContainer} elevation={2}>
      <View style={styles.cardHeader}>
        <Text variant="titleSmall" style={styles.day}>
          Day {dayNumber}
        </Text>
        <Text variant="headlineSmall" style={styles.dayTitle}>
          {title}
        </Text>
      </View>
      <View style={styles.cardContent}>
        {isEditing ? (
          <GestureHandlerRootView style={styles.listContainer}>
            <DraggableFlatList
              data={data}
              keyExtractor={(item, index) => `${item.name}_${index}`}
              onDragEnd={handleDragEnd}
              renderItem={({ item, drag, isActive }) => (
                <ItineraryActivity
                  activity={item}
                  drag={drag}
                  isActive={isActive}
                  isEditing={isEditing}
                  removeActivity={removeActivity}
                  handleActivityChange={handleActivityChange}
                />
              )}
            />
            <Button
              mode="outlined"
              style={styles.addActivity}
              onPress={addActivity}
            >
              Add Activity
            </Button>
          </GestureHandlerRootView>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => `${item.name}_${index}`}
              renderItem={({ item }) => (
                <ItineraryActivity activity={item} isEditing={isEditing} />
              )}
            />
          </View>
        )}
      </View>
    </StyledSurface>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    cardContainer: {
      borderRadius: roundness,
      margin: spacing.md,
      marginHorizontal: spacing.lg,
      padding: 0,
      overflow: "hidden",
    },
    day: {
      color: colors.secondary,
    },
    cardHeader: {
      padding: spacing.lg,
      paddingBottom: spacing.md,
      backgroundColor: colors.primary,
      borderBottomWidth: 1,
      borderBottomColor: colors.outlineVariant,
    },
    dayTitle: {
      color: colors.onPrimaryContainer,
      fontWeight: "700",
    },
    cardContent: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.lg,
    },
    listContainer: {
      flex: 1,
    },
    addActivity: {
      borderStyle: "dashed",
    },
  })

export default ItineraryDay
