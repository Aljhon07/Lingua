import axios from "axios";
import { logError } from "@utils/errorLogger";
import { domain } from "@constants/api";
import { localIP } from "@constants/api";


export const transcribeAudio = async (audioUri, lang = "en") => {
  let srEndpoint = `http://${localIP}:5000/transcribe`;
  if (lang === "en") {
    srEndpoint = `http://${localIP}:8080/transcribe`;
  }
  try {
    const formData = new FormData();

    formData.append("language", lang);
    formData.append("audio", {
      uri: audioUri,
      name: "recording.m4a",
      type: "audio/m4a",
    });

    const response = await axios.post(srEndpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    const err = logError("transcribeAudio", error);
    console.log("Error in transcribeAudio:", err);
    return err;
  }
};

export const synthesizeText = async (text, lang) => {
  let ssEndpoint = `http://${localIP}:5000/synthesize`;

  try {
    const response = await axios.post(ssEndpoint, {
      text,
      lang,
    });
    return response;
  } catch (error) {
    const err = logError("synthesizeText", error);
    console.log("Error in synthesizeText:", err);
    return err;
  }
}
