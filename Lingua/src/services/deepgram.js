import { createClient } from "@deepgram/sdk";
import * as FileSystem from 'expo-file-system';

const deepgram = createClient("68be34e3ae7bfb10c767c92a1840817e87ec9e30");

export const transcribeAudioDeepgram = async (audioUri) => {
  try {
    console.log("Transcribing audio with Deepgram...");
    console.log("Audio file URI:", audioUri);
    // Read the file as base64
    const base64Audio = await FileSystem.readAsStringAsync(audioUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    // Convert base64 to ArrayBuffer
    
    const binaryString = atob(base64Audio); 
    const len = binaryString.length;
    const buffer = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      buffer[i] = binaryString.charCodeAt(i);
    }
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      buffer,
      {
        model: "nova-3",
        smart_format: true,
      }
    );
    
    if (error) throw error;
    console.log('Transcription result:', result);
    return result;
  } catch (error) {
    console.error('Error in transcribeAudioDeepgram:', error);
    throw error;
  }
};
