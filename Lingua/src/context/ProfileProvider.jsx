import { createContext, useEffect, useState, useContext } from "react"
import {
  fetchProfile,
  updateProfile as updateProfileService,
} from "@services/directus/rest"

export const ProfileContext = createContext()

export default function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null)

  const getProfile = async () => {
    try {
      const data = await fetchProfile(
        "fields=first_name,last_name,email,id,onboarding_completed,preferred_avatar"
      )
      setProfile(data)
      return data
    } catch (error) {
      throw new Error("Error fetching profile data")
    }
  }

  const updateProfile = async (profileData) => {
    try {
      const data = await updateProfileService(profileData)
      setProfile(data)
      return data
    } catch (error) {
      throw new Error("Error updating profile data")
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, getProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfileContext = () => useContext(ProfileContext)
