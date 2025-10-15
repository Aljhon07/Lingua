#!/usr/bin/env node

/**
 * Audio Generation Runner Script
 *
 * This script executes the audio generation process for translated lessons.
 * It reads the translated_lessons.json file, generates audio files for all
 * translations, uploads them to Directus, and updates the JSON with file IDs.
 *
 * Usage: node runAudioGeneration.js
 */

require("dotenv").config();
const path = require("path");

// Import the main audio generation script
const { processLessonsWithAudio } = require("./generateAudioScript");

async function run() {
  console.log("🎯 Starting Audio Generation Process");
  console.log("====================================\n");

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
    await processLessonsWithAudio();

    console.log("\n🎉 Audio generation completed successfully!");
    console.log("📋 Summary:");
    console.log("   ✅ All translations processed");
    console.log("   ✅ Audio files generated and uploaded to Directus");
    console.log("   ✅ JSON file updated with Directus file IDs");
    console.log("   📄 Check translated_lessons.json for results");
  } catch (error) {
    console.error("\n💥 Audio generation failed:", error.message);
    console.error("\n🔍 Troubleshooting tips:");
    console.error("   - Check your internet connection");
    console.error("   - Verify Directus server is accessible");
    console.error("   - Ensure Google Cloud credentials are valid");
    console.error("   - Check if you have sufficient API quotas");

    process.exit(1);
  }
}

// Execute the runner
run();
