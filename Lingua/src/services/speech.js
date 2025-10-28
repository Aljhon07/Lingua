import axios from "axios";
import { logError } from "@utils/errorLogger";
import { domain, localIP, server } from "@constants/api";

export const transcribeAudio = async (audioUri, lang = "en", userId) => {
  let srEndpoint = `http://${domain}:5000/transcribe`;
  if (lang === "en") {
    srEndpoint = `http://${domain}:8080/transcribe`;
  }
  try {
    const formData = new FormData();

    formData.append("language", lang);
    formData.append("userId", userId);
    formData.append("audio", {
      uri: audioUri,
      name: "recording.m4a",
      type: "audio/m4a",
    });

    const response = await axios.post(srEndpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 15000,
    });

    return response;
  } catch (error) {
    const err = logError("transcribeAudio", error);
    console.log("Error in transcribeAudio:", err);
    return err;
  }
};

export const synthesizeText = async (text, lang) => {
  let ssEndpoint = `http://${domain}:5000/synthesize`;
  try {
    const response = await axios.post(ssEndpoint, {
      text,
      language: lang,
    });
    return response.data.audio;
  } catch (error) {
    const err = logError("synthesizeText", error);
    console.log("Error in synthesizeText:", err);
    return err;
  }
};

export const translateText = async (text, options) => {
  try {
    const response = await axios.post(`${server.baseURL}/translate`, {
      text,
      options,
    });
    console.log("Translation response:", response.data);
    return response.data.translation;
  } catch (error) {
    const err = logError("translateText", error);
    console.log("Error in translateText:", err);
    return err;
  }
};
