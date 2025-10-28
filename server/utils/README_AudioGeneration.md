# 🧠 AI Language Learning Audio Generator

This project contains scripts to automatically generate translations, transliterations, and audio files for language learning content, then upload the audio to Directus and maintain structured data.

## 📋 Overview

The system works in two main steps:

### Step 1: Translation Generation ✅ COMPLETED

- Reads lesson data from `lessons.json`
- Reads available languages from `languages.json`
- Manually generates translations and transliterations for all available languages
- Sets audio fields to `null` (to be filled in Step 2)
- Saves structured data to `translated_lessons.json`

### Step 2: Audio Generation & Upload ⚡ READY TO RUN

- Reads `translated_lessons.json`
- Generates audio files using Google Text-to-Speech
- Uploads audio files to Directus
- Updates the JSON with real Directus file IDs
- Saves the updated data back to `translated_lessons.json`

## 🗂️ File Structure

```
/server/utils/
├── lessons.json              # Original lesson data (English)
├── languages.json           # Available languages with IDs and codes
├── output.json             # Reference format template
├── translated_lessons.json # Generated translations (Step 1 output)
├── generateAudioScript.js  # Main audio generation script
├── runAudioGeneration.js   # Script runner with validation
└── README_AudioGeneration.md # This documentation
```

## 🛠️ Prerequisites

### Environment Variables

Make sure your `.env` file contains:

```env
DIRECTUS_SERVER_URL=your_directus_server_url
DIRECTUS_STATIC_TOKEN=your_directus_static_token
GOOGLE_APPLICATION_CREDENTIALS=path_to_google_service_account_json
```

### Dependencies

All required dependencies are already included in `package.json`:

- `@google-cloud/text-to-speech` - For audio generation
- `axios` - For HTTP requests
- `form-data` - For file uploads
- `dotenv` - For environment variables

## 🚀 Usage

### Option 1: Using npm script (Recommended)

```bash
cd server
npm run generate-audio
```

### Option 2: Direct execution

```bash
cd server
node utils/runAudioGeneration.js
```

### Option 3: Using the core script directly

```bash
cd server
node utils/generateAudioScript.js
```

## 📊 Supported Languages

The system supports the following languages (from `languages.json`):

| Language   | Code | ID  | Voice                     |
| ---------- | ---- | --- | ------------------------- |
| Japanese   | ja   | 1   | ja-JP-Chirp3-HD-Aoede     |
| Chinese    | zh   | 3   | cmn-CN-Chirp3-HD-Achernar |
| English    | en   | 4   | en-US-Chirp3-HD-Ceres     |
| Korean     | ko   | 5   | ko-KR-Chirp3-HD-Achernar  |
| Vietnamese | vi   | 6   | vi-VN-Chirp3-HD-Achernar  |
| Indonesian | id   | 7   | id-ID-Chirp3-HD-Aoede     |
| Thai       | th   | 8   | th-TH-Chirp3-HD-Achernar  |

## 🏗️ Data Structure

The final data structure in `translated_lessons.json` follows this format:

```json
[
  {
    "name": "Lesson Name",
    "description": "Lesson description",
    "order": 1,
    "vocabularies": [
      {
        "word": "English word",
        "definition": "Word definition",
        "sentence": "Example sentence",
        "translations": [
          {
            "audio": "directus-file-id-for-word",
            "audio_sentence": "directus-file-id-for-sentence",
            "language": 1,
            "sentence_transliteration": "Romanized sentence",
            "translated_sentence": "Translated sentence",
            "translated_word": "Translated word",
            "word_transliteration": "Romanized word"
          }
        ]
      }
    ]
  }
]
```

## 🔧 Script Features

### Audio Generation (`generateAudioScript.js`)

- **Modular Design**: Clean, reusable functions
- **Error Handling**: Comprehensive error handling with graceful fallbacks
- **Progress Logging**: Detailed console output for tracking progress
- **File Cleanup**: Automatically removes local audio files after upload
- **API Rate Limiting**: Built-in delays to avoid overwhelming APIs

### Script Runner (`runAudioGeneration.js`)

- **Environment Validation**: Checks required environment variables
- **Comprehensive Logging**: Detailed progress and error reporting
- **Troubleshooting**: Provides helpful error messages and tips

## 📈 Process Flow

1. **Initialization**: Validates environment and reads `translated_lessons.json`
2. **Lesson Processing**: Iterates through each lesson
3. **Vocabulary Processing**: Processes each vocabulary item
4. **Translation Processing**: For each translation:
   - Generates audio for the word
   - Generates audio for the sentence
   - Uploads both files to Directus
   - Updates the translation object with file IDs
   - Cleans up local files
5. **Data Persistence**: Saves updated data back to JSON file

## 🚨 Error Handling

The script includes robust error handling:

- **Network Issues**: Retries and graceful fallbacks
- **API Errors**: Detailed error messages with troubleshooting tips
- **File System Errors**: Safe file operations with cleanup
- **Invalid Data**: Skips problematic entries and continues processing

## 📝 Console Output

The script provides detailed console logging:

```
🚀 Starting audio generation and upload process...

📚 Found 1 lesson(s) to process

📖 Processing lesson 1: "Travel Greetings and Introductions"
   📝 10 vocabulary items to process

   📝 Processing vocabulary 1/10: "Hello"
      🌐 Processing translation 1/7 (ja)
🎵 Processing audio for language: ja
   🔸 Generating word audio: "こんにちは"
✅ Audio uploaded to Directus: 1728934567890_abc123.mp3 -> file-id-123
   🔸 Generating sentence audio: "こんにちは！ここはチェックインカウンターですか？"
✅ Audio uploaded to Directus: 1728934568123_def456.mp3 -> file-id-456
   ✅ Completed vocabulary: "Hello"
```

## 🎯 Performance Considerations

- **Rate Limiting**: 500ms delay between API calls
- **Memory Management**: Streams files instead of loading into memory
- **File Cleanup**: Removes local files immediately after upload
- **Batch Processing**: Processes one lesson at a time for better tracking

## 🔍 Troubleshooting

### Common Issues

1. **Environment Variables**: Ensure all required env vars are set
2. **Google Cloud Credentials**: Verify service account has TTS permissions
3. **Directus Access**: Check server URL and authentication token
4. **Network Connectivity**: Ensure stable internet connection
5. **API Quotas**: Monitor Google Cloud TTS usage limits

### Debug Tips

- Check console output for detailed error messages
- Verify `translated_lessons.json` exists and is valid JSON
- Test Directus connection separately
- Ensure Google Cloud project has Text-to-Speech API enabled

## 📋 Manual Translations Reference

Step 1 has already been completed with manual translations for:

- **Japanese**: Proper hiragana/katakana with accurate romanization
- **Chinese**: Simplified Chinese with Pinyin transliteration
- **Korean**: Hangul with accurate romanization
- **Vietnamese**: Native script with tone marks
- **Indonesian**: Native script (no transliteration needed)
- **Thai**: Thai script with phonetic transliteration
- **English**: Original text (reference language)

All translations include both word and sentence level content with cultural context consideration for travel scenarios.

---

## 🎉 Next Steps

After running the audio generation script:

1. Verify `translated_lessons.json` has been updated with Directus file IDs
2. Test audio playback through your application
3. Monitor Directus storage usage
4. Consider implementing audio caching strategies for production use

For questions or issues, check the console output and error messages for detailed troubleshooting information.
