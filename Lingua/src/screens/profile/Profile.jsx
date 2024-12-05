import { Loading } from "@components/atoms/Loadings"
import { getProfile } from "@services/directus/rest"
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
        const profile = await getProfile()
        setProfile(profile)
      } catch (error) {
        console.log(error)
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
