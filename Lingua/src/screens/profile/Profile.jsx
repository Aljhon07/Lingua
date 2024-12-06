import { CustomButton } from "@components/atoms/CustomButton"
import { Loading } from "@components/atoms/Loading"
import { useAuthContext } from "@context/AuthProvider"
import { useThemeContext } from "@context/ThemeProvider"
import { useToggle } from "@hooks/useToggle"
import { getProfile } from "@services/directus/rest"
import { useEffect, useState } from "react"
import { Button, Text, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [val, toggleVal] = useToggle(false)
  const { signOut } = useAuthContext()
  const { toggleTheme } = useThemeContext()
  const { colors } = useTheme()
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
      <Button mode="contained" onPress={signOut}>
        Sign Out
      </Button>
      <CustomButton primary onPress={toggleTheme}>
        {val.toString()}
      </CustomButton>
      {profile ? (
        <Text>{profile.first_name}</Text>
      ) : (
        <Text>No profile data available</Text>
      )}
    </SafeAreaView>
  )
}
