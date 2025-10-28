#!/bin/bash

# Puppeteer Chrome Dependencies Installation Script
# Run this script on your Linux server to install required dependencies

echo "🚀 Installing Puppeteer Chrome dependencies..."

# Update package lists
sudo apt-get update

# Install Chrome dependencies
sudo apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils

# Additional dependencies for newer systems
sudo apt-get install -y \
    libgbm-dev \
    libxshmfence1

echo "✅ Dependencies installed successfully!"
echo "📝 You may need to restart your Node.js application for changes to take effect."
echo ""
echo "If you're using PM2, run: pm2 restart lingua"
echo "If you're using Docker, rebuild your container with these dependencies."