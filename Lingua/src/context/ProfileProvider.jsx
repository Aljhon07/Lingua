import { createContext, useEffect, useState, useContext } from "react"
import { fetchProfile } from "@services/directus/rest"

export const ProfileContext = createContext()

export default function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null)

  const getProfile = async () => {
    try {
      const data = await fetchProfile("fields=first_name,last_name,email")
      setProfile(data)
      return data
    } catch (error) {
      return null
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, getProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfileContext = () => useContext(ProfileContext)
