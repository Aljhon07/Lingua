import React, { createContext, useContext, useState } from "react"
import { patchUserItinerary } from "@services/directus/rest"

const CustomItinerary = createContext()

export default function CustomItineraryProvider({ children }) {
  const [original, setOriginal] = useState(null)
  const [changes, setChanges] = useState(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const handleChanges = (newChanges) => {
    setChanges((prevChanges) => ({
      ...prevChanges,
      ...newChanges,
    }))
  }

  const updateUserItinerary = async (id) => {
    try {
      console.log("Saving", id)
      setSaving(true)
      const res = await patchUserItinerary({ id, data: changes })
      setEditing(false)
      setSaving(false)
      console.log("Itinerary updated:", res)
    } catch (error) {
      setSaving(false)
      console.log("Error updating itinerary:", error)
    }
  }
  const value = {
    original,
    setOriginal,
    changes,
    setChanges,
    editing,
    setEditing,
    handleChanges,
    updateUserItinerary,
    saving,
  }

  return (
    <CustomItinerary.Provider value={value}>
      {children}
    </CustomItinerary.Provider>
  )
}

export const useCustomItinerary = () => useContext(CustomItinerary)
