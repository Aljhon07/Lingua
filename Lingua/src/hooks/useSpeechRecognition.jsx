import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { transcribeAudio } from "@services/speech";
import { Alert, Platform, Linking } from "react-native";
import { PerfMonitor } from "@utils/perfMonitor";

export const useSpeechRecognition = (userId) => {
  const [srState, setSrState] = useState({
    isRecording: false,
    isProcessing: false,
    record: null,
    transcription: null,
  });

  useEffect(() => {
    requestPermission();

    return () => {
      if (srState.isRecording) {
        stopRecording();
      }
    };
  }, []);

  const openAppSettings = async () => {
    try {
      if (Platform.OS === "android") {
        // For Android, try to open app-specific settings directly
        const canOpen = await Linking.canOpenURL("app-settings:");
        if (canOpen) {
          await Linking.openURL("app-settings:");
        } else {
          // Fallback to general app settings
          await Linking.openSettings();
        }
      }
    } catch (error) {
      console.error("Error opening settings:", error);
      // Fallback to general settings if specific settings fail
      await Linking.openSettings();
    }
  };

  const requestPermission = async () => {
    try {
      const { status, canAskAgain } = await Audio.getPermissionsAsync();
      console.log("Permission status:", status);
      console.log("Can ask again:", canAskAgain);

      // If permission is already granted, return immediately
      if (status === "granted") {
        return status;
      }

      // If permission can still be requested, try to request it
      if (status !== "granted" && canAskAgain) {
        const { status: newStatus } = await Audio.requestPermissionsAsync();
        return newStatus;
      }

      // If permission is permanently denied (canAskAgain is false)
      if (status === "denied" && !canAskAgain) {
        return new Promise((resolve) => {
          Alert.alert(
            "Microphone Permission Required",
            "Microphone access is required for speech recognition. Please enable it in your app settings.",
            [
              {
                text: "Cancel",
                style: "cancel",
                onPress: () => resolve("denied"),
              },
              {
                text: "Settings",
                onPress: async () => {
                  await openAppSettings();
                  resolve("denied"); // Still return denied as user needs to manually enable
                },
              },
            ],
            { cancelable: false }
          );
        });
      }

      return status;
    } catch (error) {
      console.error("Permission error:", error);
      return "denied";
    }
  };

  const startRecording = async () => {
    try {
      const status = await requestPermission();
      if (status !== "granted") {
        setSrState((prevState) => ({
          ...prevState,
          transcription:
            "Microphone permission is required for speech recognition",
        }));
        return;
      }
      setSrState((prevState) => ({
        ...prevState,
        isProcessing: true,
      }));

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setSrState((prevState) => ({
        ...prevState,
        isRecording: true,
        record: newRecording,
        isProcessing: false,
      }));
      console.log("Recording started");
    } catch (error) {
      console.error("Error starting recording:", JSON.stringify(error));
      setSrState((prevState) => ({
        ...prevState,
        isProcessing: false,
        transcription: "Error starting recording",
      }));
    }
  };

  const stopRecording = async (lang) => {
    if (!srState.isRecording) return;
    setSrState((prevState) => ({
      ...prevState,
      isProcessing: true,
      isRecording: false,
      transcription: "Processing...",
    }));

    try {
      await srState.record.stopAndUnloadAsync();
      PerfMonitor.startSpeech(); // Start timing when recording stops
      const uri = srState.record.getURI();

      if (!uri) {
        throw new Error("No recording URI found");
      }

      const res = await transcribeAudio(uri, lang, userId);
      if (res.status !== 200 || res.error) {
        console.log(res);
        throw new Error(res.message);
      }

      console.log("Transcript received: " + JSON.stringify(res.data));
      PerfMonitor.endSpeech(); // End timing when transcript received
      setSrState((prevState) => ({
        ...prevState,
        isRecording: false,
        isProcessing: false,
        transcription: res.data.transcript || "No transcription.",
      }));
    } catch (error) {
      console.log("Error: " + error);
      setSrState((prevState) => ({
        ...prevState,
        isProcessing: false,
        transcription: error.message,
      }));
    } finally {
      setSrState((prevState) => ({
        ...prevState,
        isRecording: false,
        isProcessing: false,
      }));
    }
  };
  const handleRecord = async (lang) => {
    if (srState.isProcessing) return;

    console.log(lang);
    if (srState.isRecording) {
      await stopRecording(lang);
    } else {
      await startRecording();
    }
  };

  return {
    isRecording: srState.isRecording,
    isProcessing: srState.isProcessing,
    transcript: srState.transcription,
    handleRecord,
  };
};
