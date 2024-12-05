import React, { createContext, useContext, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export const FontContext = createContext();

export default function FontProvider({ children }) {
  const [fontsLoaded] = useFonts({
    "MerriWeather-Regular": require("../../assets/fonts/Merriweather-Regular.ttf"),
    "MerriWeather-Bold": require("../../assets/fonts/Merriweather-Bold.ttf"),
    "MerriWeather-Black": require("../../assets/fonts/Merriweather-Black.ttf"),

    "CrimsonText-Regular": require("../../assets/fonts/CrimsonText-Regular.ttf"),
    "CrimsonText-Bold": require("../../assets/fonts/CrimsonText-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <FontContext.Provider
      value={{
        fonts: {
          MerriweatherRegular: "MerriWeather-Regular",
          MerriweatherBold: "MerriWeather-Bold",
          MerriweatherBlack: "MerriWeather-Black",

          CrimsonTextRegular: "CrimsonText-Regular",
          CrimsonTextBold: "CrimsonText-Bold",
        },
      }}
    >
      {children}
    </FontContext.Provider>
  );
}

export const useFontContext = () => useContext(FontContext);
