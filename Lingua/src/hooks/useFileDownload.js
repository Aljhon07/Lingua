import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

const PERMISSION_KEY = "storage_permission_granted";

export const useFileDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const hasPermission = async () => {
    try {
      const granted = await AsyncStorage.getItem(PERMISSION_KEY);
      return granted === "true";
    } catch {
      return false;
    }
  };

  const setPermissionGranted = async () => {
    try {
      await AsyncStorage.setItem(PERMISSION_KEY, "true");
    } catch {
      // Ignore storage errors
    }
  };

  const downloadFile = async (url, filename, onSuccess, onError) => {
    if (isDownloading) return;

    setIsDownloading(true);

    try {
      // Download to app storage first
      const downloadPath = FileSystem.documentDirectory + filename;
      const { uri } = await FileSystem.downloadAsync(url, downloadPath);

      // Check if we've already granted permission before
      const permissionGranted = await hasPermission();

      let directoryUri;

      if (permissionGranted) {
        // Just show folder picker without permission request
        directoryUri =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      } else {
        // First time - show permission request
        directoryUri =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (directoryUri.granted) {
          await setPermissionGranted();
        }
      }

      if (directoryUri.granted) {
        // Copy file to user-selected location
        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
          directoryUri.directoryUri,
          filename,
          "application/pdf"
        );

        const fileContent = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await FileSystem.writeAsStringAsync(fileUri, fileContent, {
          encoding: FileSystem.EncodingType.Base64,
        });

        onSuccess?.(`Downloaded: ${filename}`);
      } else {
        onError?.("Folder selection cancelled");
      }
    } catch (error) {
      console.error("Download error:", error);
      onError?.("Download failed");
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    isDownloading,
    downloadFile,
  };
};
