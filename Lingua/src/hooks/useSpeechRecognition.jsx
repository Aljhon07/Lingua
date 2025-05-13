import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { transcribeAudio } from "@services/speech";

export const useSpeechRecognition = () => {
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
    if (Platform.OS === "ios") {
      await Linking.openURL("app-settings:");
    } else {
      await Linking.openSettings();
    }
  };

  const requestPermission = async () => {
    try {
      const { status, canAskAgain } = await Audio.getPermissionsAsync();
      console.log("Permission status:", status);
      console.log("Can ask again:", canAskAgain);
      if (status == "denied" && !canAskAgain) {
        Alert.alert(
          "Permission Denied",
          "Please enable microphone permissions in settings.",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Settings",
              onPress: () => openAppSettings(),
            },
          ],
          { cancelable: false }
        );
      }
      if (status !== "granted") {
        const { status: newStatus } = await Audio.requestPermissionsAsync();
        return newStatus;
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
      if (status == "denied") {
        setTranscript("Permission to access microphone was denied");
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

  const stopRecording = async () => {
    if (!srState.isRecording) return;
    setSrState((prevState) => ({
      ...prevState,
      isProcessing: true,
      isRecording: false,
      transcription: "Processing...",
    }));

    try {
      await srState.record.stopAndUnloadAsync();
      const uri = srState.record.getURI();

      if (!uri) {
        throw new Error("No recording URI found");
      }

      const res = await transcribeAudio(uri);
      if (res.status !== 200 || res.error) {
        console.log(res);
        throw new Error(res.message);
      }
      setSrState((prevState) => ({
        ...prevState,
        isRecording: false,
        isProcessing: false,
        transcription: res.data.transcript || "No transcription available",
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
  const handleRecord = async () => {
    if (srState.isProcessing) return;

    if (srState.isRecording) {
      await stopRecording();
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
