import axios from "axios"
import { logError } from "@utils/errorLogger"
import { domain } from "@constants/api"
const srEndpoint = `http://${domain}:8080/transcribe`

export const transcribeAudio = async (audioUri) => {
  try {
    const formData = new FormData()

    console.log("Audio file URI:", audioUri)
    formData.append("audio", {
      uri: audioUri,
      name: "recording.m4a",
      type: "audio/m4a",
    })

    const response = await axios.post(srEndpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response
  } catch (error) {
    logError("transcribeAudio", error)
    throw new Error("Failed to transcribe audio")
  }
}
