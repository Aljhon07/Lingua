import { Loading } from "@components/atoms/Loadings"
import { getProfile } from "@services/directus"
import { getItemAsync } from "expo-secure-store"
import { useEffect, useState } from "react"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile...")
        const accessToken = await getItemAsync("access_token")
        console.log("Access token:", accessToken)

        const res = await getProfile()
        console.log("Profile response:", res)

        setProfile(res)
      } catch (err) {
        console.error("Error fetching profile:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) return <Loading />

  return (
    <SafeAreaView>
      <Text>Profile</Text>
      {profile ? (
        <Text>{profile.first_name}</Text>
      ) : (
        <Text>No profile data available</Text>
      )}
    </SafeAreaView>
  )
}
