import { getProfile } from "@services/directus";
import { getItemAsync } from "expo-secure-store";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TravelPackagesListing() {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      console.log(await getItemAsync("access_token"));
      const res = await getProfile();
      setProfile(res);
    };

    fetchProfile();
  }, []);

  return (
    <SafeAreaView>
      <Text>TravelPackagesListing</Text>
      {profile && <Text>{profile.first_name}</Text>}
    </SafeAreaView>
  );
}
