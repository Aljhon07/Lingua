import axios from "axios";

export const transcribeAudioDeepgram = async (audioUri) => {
  try {
    console.log("Transcribing audio...")
    const result = await axios.post("http://localhost:5000/transcribe", {
      audio: audioUri,
      language: "en",
    })

    if (result.error) throw result.error;
    console.log('Transcription result:', result);
    return result;
  } catch (error) {
    console.error('Error in transcribeAudioDeepgram:', error);
    throw error;
  }
};
