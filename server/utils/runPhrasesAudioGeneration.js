#!/usr/bin/env node

/**
 * Phrases Audio Generation Runner Script
 *
 * This script executes the audio generation process for phrases in phrases_output.json.
 * It reads the phrases_output.json file, generates audio files for all
 * translations, uploads them to Directus, and updates the JSON with file IDs.
 *
 * Usage: node runPhrasesAudioGeneration.js
 */

require("dotenv").config();
const path = require("path");

// Import the main audio generation script
const { processPhrasesWithAudio } = require("./generatePhrasesAudioScript");

async function run() {
  console.log("🎯 Starting Phrases Audio Generation Process");
  console.log("==========================================\n");

  // Check if required environment variables are set
  const requiredEnvVars = [
    "DIRECTUS_SERVER_URL",
    "DIRECTUS_STATIC_TOKEN",
    "GOOGLE_CREDENTIALS",
  ];
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    console.error("❌ Missing required environment variables:");
    missingEnvVars.forEach((envVar) => {
      console.error(`   - ${envVar}`);
    });
    console.error(
      "\nPlease check your .env file or environment configuration."
    );
    process.exit(1);
  }

  console.log("✅ Environment variables validated");
  console.log(`📡 Directus Server: ${process.env.DIRECTUS_SERVER_URL}`);
  console.log(`🔐 Using static token authentication`);
  console.log(`🎤 Google TTS credentials configured\n`);

  try {
    // Run the audio generation process
    await processPhrasesWithAudio();

    console.log("\n🎉 Phrases audio generation completed successfully!");
    console.log("📋 Summary:");
    console.log("   ✅ All phrase translations processed");
    console.log("   ✅ Audio files generated and uploaded to Directus");
    console.log("   ✅ JSON file updated with Directus file IDs");
    console.log("   📄 Check phrases_output.json for results");
  } catch (error) {
    console.error("\n💥 Phrases audio generation failed:", error.message);
    console.error("\n🔍 Troubleshooting tips:");
    console.error("   - Check your internet connection");
    console.error("   - Verify Directus server is accessible");
    console.error("   - Ensure Google Cloud credentials are valid");
    console.error("   - Check if you have sufficient API quotas");
    console.error("   - Verify phrases_output.json exists and is valid");

    process.exit(1);
  }
}

// Execute the runner
run();
