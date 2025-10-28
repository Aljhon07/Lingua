module.exports = {
  expo: {
    name: "Lingua",
    slug: "Lingua",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/app_icon.png",
    userInterfaceStyle: "light",
    platforms: ["android"],
    newArchEnabled: true,
    splash: {
      image: "./assets/app_icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/app_icon.png",
        backgroundColor: "#000000",
      },
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      softwareKeyboardLayoutMode: "pan",
      permissions: [
        "android.permission.RECORD_AUDIO",
        "android.permission.MODIFY_AUDIO_SETTINGS",
        "android.permission.RECORD_AUDIO",
        "android.permission.MODIFY_AUDIO_SETTINGS",
      ],
      package: "com.unknown067.Lingua",
    },
    web: {
      favicon: "./assets/app_icon.png",
    },
    plugins: [
      "expo-secure-store",
      "expo-notifications",
      "@react-native-google-signin/google-signin",
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
      [
        "expo-audio",
        {
          microphonePermission: "Allow Lingua to access your microphone.",
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            usesCleartextTraffic: true,
          },
        },
      ],
      "expo-font",
      "expo-asset",
    ],
    extra: {
      eas: {
        projectId: "2f69e6b7-fbf3-4b8e-9a9e-c66ebf3bf16b",
      },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/2f69e6b7-fbf3-4b8e-9a9e-c66ebf3bf16b",
    },
  },
};
