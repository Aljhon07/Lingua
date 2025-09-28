import React, { createContext, useState, useContext } from 'react'

const PhrasebookContext = createContext()

export const PhrasebookProvider = ({ children }) => {
  const [showPhrasebook, setShowPhrasebook] = useState(false)

  return <PhrasebookContext.Provider value={{ showPhrasebook, setShowPhrasebook }}>{children}</PhrasebookContext.Provider>
}

export const usePhrasebook = () => useContext(PhrasebookContext)
