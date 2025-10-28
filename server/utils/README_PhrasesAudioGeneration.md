# 🗣️ Phrases Audio Generator

This script automatically generates audio files for phrase translations in `phrases_output.json` and uploads them to Directus.

## 📋 Overview

The phrases audio generation system:

1. **Reads** `phrases_output.json` file
2. **Generates** audio files using Google Text-to-Speech for each translation
3. **Uploads** audio files to Directus
4. **Updates** the JSON file with Directus file IDs
5. **Cleans up** local audio files after upload

## 🗂️ File Structure

```
/server/utils/
├── phrases_output.json                # Input: Phrases with translations
├── generatePhrasesAudioScript.js      # Main audio generation script
├── runPhrasesAudioGeneration.js       # Script runner with validation
└── README_PhrasesAudioGeneration.md   # This documentation
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
npm run generate-phrases-audio
```

### Option 2: Direct execution

```bash
cd server
node utils/runPhrasesAudioGeneration.js
```

### Option 3: Using the core script directly

```bash
cd server
node utils/generatePhrasesAudioScript.js
```

## 📊 Supported Languages

The script supports all languages defined in the phrases:

- **Japanese** (ID: 1) - `ja-JP`
- **Chinese** (ID: 3) - `cmn-CN`
- **English** (ID: 4) - `en-US`
- **Korean** (ID: 5) - `ko-KR`
- **Vietnamese** (ID: 6) - `vi-VN`
- **Indonesian** (ID: 7) - `id-ID`
- **Thai** (ID: 8) - `th-TH`

## 🏗️ Data Structure

The script processes `phrases_output.json` with this structure:

```json
[
  {
    "phrase": "English phrase text",
    "category": {
      "name": "Category Name"
    },
    "translation": [
      {
        "translation": "Translated text",
        "transliteration": "Romanized text",
        "language": 1,
        "audio": null // ← This gets updated with Directus file ID
      }
    ]
  }
]
```

After processing, the `audio` field will contain Directus file IDs:

```json
{
  "translation": "こんにちは",
  "transliteration": "Konnichiwa",
  "language": 1,
  "audio": "abc123-def456-ghi789" // ← Directus file ID
}
```

## 🔧 Script Features

### Audio Generation (`generatePhrasesAudioScript.js`)

- **Modular Design**: Clean, reusable functions
- **Error Handling**: Comprehensive error handling with graceful fallbacks
- **Progress Logging**: Detailed console output for tracking progress
- **File Cleanup**: Automatically removes local audio files after upload
- **API Rate Limiting**: Built-in 500ms delays to avoid overwhelming APIs

### Script Runner (`runPhrasesAudioGeneration.js`)

- **Environment Validation**: Checks required environment variables
- **Comprehensive Logging**: Detailed progress and error reporting
- **Troubleshooting**: Provides helpful error messages and tips

## 📈 Process Flow

1. **Initialization**: Validates environment and reads `phrases_output.json`
2. **Phrase Processing**: Iterates through each phrase
3. **Translation Processing**: For each translation:
   - Generates audio for the translation text
   - Uploads audio file to Directus
   - Updates the translation object with file ID
   - Cleans up local files
4. **Data Persistence**: Saves updated data back to JSON file

## 🚨 Error Handling

The script includes robust error handling:

- **Network Issues**: Retries and graceful fallbacks
- **API Errors**: Detailed error messages with troubleshooting tips
- **File System Errors**: Safe file operations with cleanup
- **Invalid Data**: Skips problematic entries and continues processing

## 📝 Console Output

The script provides detailed console logging:

```
🎯 Starting Phrases Audio Generation Process
==========================================

✅ Environment variables validated
📡 Directus Server: https://your-directus-server.com
🔐 Using static token authentication
🎤 Google TTS credentials configured

🚀 Starting phrases audio generation and upload process...

📚 Found 5 phrase(s) to process

📖 Processing phrase 1/5: "I am ready to start my journey."
   📝 7 translation(s) to process

      🌐 Processing translation 1/7 (ja)
🎵 Processing audio for language: ja
   🔸 Generating audio: "準備ができました。"
✅ Audio uploaded to Directus: 1698765432123_abc123.mp3 -> file-id-123
   ✅ Completed phrase: "I am ready to start my journey."
```

## 🎯 Performance Considerations

- **Rate Limiting**: 500ms delay between API calls
- **Memory Management**: Streams files instead of loading into memory
- **File Cleanup**: Removes local files immediately after upload
- **Batch Processing**: Processes one phrase at a time for better tracking

## 🔍 Troubleshooting

### Common Issues

1. **Environment Variables**: Ensure all required env vars are set
2. **Google Cloud Credentials**: Verify service account has TTS permissions
3. **Directus Access**: Check server URL and authentication token
4. **Network Connectivity**: Ensure stable internet connection
5. **API Quotas**: Monitor Google Cloud TTS usage limits

### Debug Tips

- Check console output for detailed error messages
- Verify `phrases_output.json` exists and is valid JSON
- Test Directus connection separately
- Ensure Google Cloud project has Text-to-Speech API enabled

## 🎉 Next Steps

After running the phrases audio generation script:

1. Verify `phrases_output.json` has been updated with Directus file IDs
2. Test audio playback through your application
3. Monitor Directus storage usage
4. Consider implementing audio caching strategies for production use

For questions or issues, check the console output and error messages for detailed troubleshooting information.
