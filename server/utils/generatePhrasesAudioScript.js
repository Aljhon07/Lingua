const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const { TextToSpeechClient } = require("@google-cloud/text-to-speech");

// Import the speech service functions
const { client } = require("../services/speech");
const axiosInstance = require("./axiosInstance");

// Language voice mapping (from speech.js)
const languageVoiceMap = {
  en: { languageCode: "en-US", voiceName: "en-US-Chirp3-HD-Ceres" },
  ja: { languageCode: "ja-JP", voiceName: "ja-JP-Chirp3-HD-Aoede" },
  zh: { languageCode: "cmn-CN", voiceName: "cmn-CN-Chirp3-HD-Achernar" },
  ko: { languageCode: "ko-KR", voiceName: "ko-KR-Chirp3-HD-Achernar" },
  vi: { languageCode: "vi-VN", voiceName: "vi-VN-Chirp3-HD-Achernar" },
  id: { languageCode: "id-ID", voiceName: "id-ID-Chirp3-HD-Aoede" },
  th: { languageCode: "th-TH", voiceName: "th-TH-Chirp3-HD-Achernar" },
};

// Language ID to code mapping
const languageIdToCode = {
  1: "ja",
  3: "zh",
  5: "ko",
  6: "vi",
  7: "id",
  8: "th",
};

/**
 * Generate audio file using Google Text-to-Speech
 * @param {string} text - Text to synthesize
 * @param {string} languageCode - Language code (e.g., 'en', 'ja')
 * @returns {Promise<string>} - Returns the filename of the generated audio
 */
async function generateAudio(text, languageCode) {
  try {
    const voice = {
      languageCode: languageVoiceMap[languageCode].languageCode,
      ssmlGender: "FEMALE",
      name: languageVoiceMap[languageCode].voiceName,
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

    const uuid =
      Date.now().toString() + "_" + Math.random().toString(36).substr(2, 9);
    const filename = `${uuid}.mp3`;
    const savePath = path.join(outputDir, filename);

    await fs.promises.writeFile(savePath, response.audioContent, "binary");

    return filename;
  } catch (error) {
    console.error(
      `❌ Audio generation failed for text: "${text}" in language: ${languageCode}`,
      error.message
    );
    throw error;
  }
}

/**
 * Upload audio file to Directus
 * @param {string} audioPath - Full path to the audio file
 * @param {string} filename - Name of the file
 * @returns {Promise<string>} - Returns the Directus file ID
 */
async function uploadAudioToDirectus(audioPath, filename) {
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(audioPath));

    const response = await axiosInstance.post("/files", formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    const fileId = response.data.data.id;
    console.log(`✅ Audio uploaded to Directus: ${filename} -> ${fileId}`);
    return fileId;
  } catch (error) {
    console.error(`❌ Upload failed for ${filename}:`, error.message);
    throw error;
  }
}

/**
 * Process a single translation - generate audio and upload to Directus
 * @param {Object} translation - Translation object
 * @param {string} languageCode - Language code
 * @returns {Promise<Object>} - Updated translation object with audio ID
 */
async function processTranslation(translation, languageCode) {
  try {
    console.log(`🎵 Processing audio for language: ${languageCode}`);

    let audioId = null;

    // Generate audio for the translation text
    if (translation.translation) {
      console.log(`   🔸 Generating audio: "${translation.translation}"`);
      const audioFilename = await generateAudio(
        translation.translation,
        languageCode
      );
      const audioPath = path.resolve(__dirname, "../output", audioFilename);
      audioId = await uploadAudioToDirectus(audioPath, audioFilename);

      // Clean up local file after upload
      try {
        fs.unlinkSync(audioPath);
      } catch (cleanupError) {
        console.warn(`⚠️ Could not delete local file: ${audioPath}`);
      }
    }

    // Return updated translation object
    return {
      ...translation,
      audio: audioId,
    };
  } catch (error) {
    console.error(
      `❌ Error processing translation for language ${languageCode}:`,
      error.message
    );
    // Return original translation object if processing fails
    return translation;
  }
}

/**
 * Process all phrases and generate audio files
 */
async function processPhrasesWithAudio() {
  try {
    console.log("🚀 Starting phrases audio generation and upload process...\n");

    // Read the phrases output file
    const phrasesOutputPath = path.join(__dirname, "phrases_output.json");
    const phrasesData = JSON.parse(fs.readFileSync(phrasesOutputPath, "utf8"));

    console.log(`📚 Found ${phrasesData.length} phrase(s) to process\n`);

    // Process each phrase
    for (let phraseIndex = 0; phraseIndex < phrasesData.length; phraseIndex++) {
      const phrase = phrasesData[phraseIndex];
      console.log(
        `📖 Processing phrase ${phraseIndex + 1}/${phrasesData.length}: "${
          phrase.phrase
        }"`
      );
      console.log(
        `   📝 ${phrase.translation.length} translation(s) to process\n`
      );

      // Process each translation
      for (
        let transIndex = 0;
        transIndex < phrase.translation.length;
        transIndex++
      ) {
        const translation = phrase.translation[transIndex];
        const languageCode = languageIdToCode[translation.language];

        if (!languageCode) {
          console.warn(
            `⚠️ Unknown language ID: ${translation.language}, skipping...`
          );
          continue;
        }

        console.log(
          `      🌐 Processing translation ${transIndex + 1}/${
            phrase.translation.length
          } (${languageCode})`
        );

        // Process the translation (generate audio and upload)
        phrase.translation[transIndex] = await processTranslation(
          translation,
          languageCode
        );

        // Small delay to avoid overwhelming the APIs
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      console.log(`   ✅ Completed phrase: "${phrase.phrase}"\n`);
    }

    // Save the updated data back to the file
    fs.writeFileSync(
      phrasesOutputPath,
      JSON.stringify(phrasesData, null, 2),
      "utf8"
    );

    console.log(
      "🎉 Phrases audio generation and upload process completed successfully!"
    );
    console.log(`📄 Updated data saved to: ${phrasesOutputPath}`);
  } catch (error) {
    console.error("❌ Error in main process:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log("🧠 AI Language Learning Phrases Audio Generator");
  console.log("=============================================\n");

  try {
    await processPhrasesWithAudio();
  } catch (error) {
    console.error("💥 Fatal error:", error.message);
    process.exit(1);
  }
}

// Run the script if executed directly
if (require.main === module) {
  main();
}

module.exports = {
  processPhrasesWithAudio,
  generateAudio,
  uploadAudioToDirectus,
  processTranslation,
};
