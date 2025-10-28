const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const { TextToSpeechClient } = require("@google-cloud/text-to-speech");

// Import the speech service functions
const { client } = require("../services/speech");
const axiosInstance = require("./axiosInstance");

// Initialize Google Cloud Text-to-Speech client

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

    formData.append("file", fs.createReadStream(audioPath), {
      filename: filename,
      contentType: "audio/mpeg",
    });

    const uploadResponse = await axiosInstance.post("/files", formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    console.log(
      `✅ Audio uploaded to Directus: ${filename} -> ${uploadResponse.data.data.id}`
    );
    return uploadResponse.data.data.id;
  } catch (error) {
    console.error(
      `❌ Audio upload failed for file: ${filename}`,
      error.response?.data || error.message
    );
    throw error;
  }
}

/**
 * Process a single translation - generate audio and upload to Directus
 * @param {Object} translation - Translation object
 * @param {string} languageCode - Language code
 * @returns {Promise<Object>} - Updated translation object with audio IDs
 */
async function processTranslation(translation, languageCode) {
  try {
    console.log(`🎵 Processing audio for language: ${languageCode}`);

    let audioId = null;
    let audioSentenceId = null;

    // Generate audio for the word
    if (translation.translated_word) {
      console.log(
        `   🔸 Generating word audio: "${translation.translated_word}"`
      );
      const wordAudioFilename = await generateAudio(
        translation.translated_word,
        languageCode
      );
      const wordAudioPath = path.resolve(
        __dirname,
        "../output",
        wordAudioFilename
      );
      audioId = await uploadAudioToDirectus(wordAudioPath, wordAudioFilename);

      // Clean up local file after upload
      try {
        fs.unlinkSync(wordAudioPath);
      } catch (cleanupError) {
        console.warn(`⚠️ Could not delete local file: ${wordAudioPath}`);
      }
    }

    // Generate audio for the sentence
    if (translation.translated_sentence) {
      console.log(
        `   🔸 Generating sentence audio: "${translation.translated_sentence}"`
      );
      const sentenceAudioFilename = await generateAudio(
        translation.translated_sentence,
        languageCode
      );
      const sentenceAudioPath = path.resolve(
        __dirname,
        "../output",
        sentenceAudioFilename
      );
      audioSentenceId = await uploadAudioToDirectus(
        sentenceAudioPath,
        sentenceAudioFilename
      );

      // Clean up local file after upload
      try {
        fs.unlinkSync(sentenceAudioPath);
      } catch (cleanupError) {
        console.warn(`⚠️ Could not delete local file: ${sentenceAudioPath}`);
      }
    }

    // Update translation object
    return {
      ...translation,
      audio: audioId,
      audio_sentence: audioSentenceId,
    };
  } catch (error) {
    console.error(
      `❌ Failed to process translation for language ${languageCode}:`,
      error.message
    );
    // Return original translation with null audio fields in case of error
    return {
      ...translation,
      audio: null,
      audio_sentence: null,
    };
  }
}

/**
 * Process all lessons and generate audio files
 */
async function processLessonsWithAudio() {
  try {
    console.log("🚀 Starting audio generation and upload process...\n");

    // Read the translated lessons file
    const translatedLessonsPath = path.join(
      __dirname,
      "translated_lessons.json"
    );
    const lessonsData = JSON.parse(
      fs.readFileSync(translatedLessonsPath, "utf8")
    );

    console.log(`📚 Found ${lessonsData.length} lesson(s) to process\n`);

    // Process each lesson
    for (let lessonIndex = 0; lessonIndex < lessonsData.length; lessonIndex++) {
      const lesson = lessonsData[lessonIndex];
      console.log(`📖 Processing lesson ${lessonIndex + 1}: "${lesson.name}"`);
      console.log(
        `   📝 ${lesson.vocabularies.length} vocabulary items to process\n`
      );

      // Process each vocabulary item
      for (
        let vocabIndex = 0;
        vocabIndex < lesson.vocabularies.length;
        vocabIndex++
      ) {
        const vocabulary = lesson.vocabularies[vocabIndex];
        console.log(
          `   📝 Processing vocabulary ${vocabIndex + 1}/${
            lesson.vocabularies.length
          }: "${vocabulary.word}"`
        );

        // Process each translation
        for (
          let transIndex = 0;
          transIndex < vocabulary.translations.length;
          transIndex++
        ) {
          const translation = vocabulary.translations[transIndex];
          const languageCode = languageIdToCode[translation.language];

          if (!languageCode) {
            console.warn(
              `⚠️ Unknown language ID: ${translation.language}, skipping...`
            );
            continue;
          }

          console.log(
            `      🌐 Processing translation ${transIndex + 1}/${
              vocabulary.translations.length
            } (${languageCode})`
          );

          // Process the translation (generate audio and upload)
          vocabulary.translations[transIndex] = await processTranslation(
            translation,
            languageCode
          );

          // Small delay to avoid overwhelming the APIs
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        console.log(`   ✅ Completed vocabulary: "${vocabulary.word}"\n`);
      }

      console.log(`✅ Completed lesson: "${lesson.name}"\n`);
    }

    // Save the updated data back to the file
    fs.writeFileSync(
      translatedLessonsPath,
      JSON.stringify(lessonsData, null, 2),
      "utf8"
    );

    console.log(
      "🎉 Audio generation and upload process completed successfully!"
    );
    console.log(`📄 Updated data saved to: ${translatedLessonsPath}`);
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
  console.log("🧠 AI Language Learning Audio Generator");
  console.log("=====================================\n");

  try {
    await processLessonsWithAudio();
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
  processLessonsWithAudio,
  generateAudio,
  uploadAudioToDirectus,
  processTranslation,
};
