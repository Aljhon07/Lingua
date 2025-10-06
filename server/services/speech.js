const { createClient } = require("@deepgram/sdk");
const fs = require("fs");
const path = require("path");

const { TranslationServiceClient } = require("@google-cloud/translate");
const textToSpeech = require("@google-cloud/text-to-speech");
const deepgram = createClient("68be34e3ae7bfb10c767c92a1840817e87ec9e30");
const transcribeFile = async (req, res) => {
  try {
    const audioPath = req.file.path;
    const lang = req.body.language;

    console.log("Language:", lang);
    console.log("Audio path:", audioPath);

    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      fs.readFileSync(audioPath),
      {
        language: lang,
        model: "nova-2",
        smart_format: true,
      }
    );

    if (error) throw error;

    const transcript =
      result?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";
    console.log("Transcript:", transcript);

    res.json({ transcript });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Transcription failed" });
  } finally {
    if (req.file) fs.unlinkSync(req.file.path);
  }
};
const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const outputDir = path.resolve(__dirname, "../output");
const client = new textToSpeech.TextToSpeechClient({
  credentials: GOOGLE_CREDENTIALS,
  projectId: GOOGLE_CREDENTIALS.project_id,
});

const languageVoiceMap = {
  en: { languageCode: "en-US", voiceName: "en-US-Neural2-C" },
  ja: { languageCode: "ja-JP", voiceName: "ja-JP-Chirp3-HD-Sulafat" },
  zh: { languageCode: "cmn-CN", voiceName: "cmn-CN-Chirp3-HD-Achernar" },
  ko: { languageCode: "ko-KR", voiceName: "ko-KR-Chirp3-HD-Achernar" },
  vi: { languageCode: "vi-VN", voiceName: "vi-VN-Chirp3-HD-Achernar" },
  id: { languageCode: "id-ID", voiceName: "id-ID-Chirp3-HD-Aoede" },
  th: { languageCode: "th-TH", voiceName: "th-TH-Chirp3-HD-Achernar" },
};

const synthesizeAudio = async (req, res) => {
  try {
    const { text, language = "en" } = req.body;
    const voice = {
      languageCode: languageVoiceMap[language].languageCode,
      ssmlGender: "FEMALE",
      name: languageVoiceMap[language].voiceName,
    };

    const request = {
      input: { text: text },
      voice,
      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await client.synthesizeSpeech(request);

    const outputDir = path.resolve(__dirname, "../output");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const uuid = Date.now().toString();
    const savePath = path.join(outputDir, `${uuid}.mp3`);

    await fs.promises.writeFile(savePath, response.audioContent, "binary");

    res.send({ audio: uuid + ".mp3" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Synthesis failed" });
  }
};

module.exports = { transcribeFile, synthesizeAudio };
