import { setItemAsync } from "expo-secure-store";

export async function saveTokens(accessToken, refreshToken) {
  try {
    await setItemAsync("access_token", accessToken);
    await setItemAsync("refresh_token", refreshToken);
  } catch (error) {
    console.error("Error saving tokens:", error);
  }
}
