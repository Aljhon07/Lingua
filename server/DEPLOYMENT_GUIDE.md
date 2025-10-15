# 🚀 Puppeteer Server Deployment Guide

## Problem

Puppeteer fails on Linux servers due to missing Chrome browser dependencies.

## Solutions (Choose one based on your setup)

### Option 1: Direct Server Installation (Ubuntu/Debian)

1. **SSH into your server and run these commands step by step:**

   ```bash
   # Navigate to your server directory
   cd ~/Lingua/server

   # Make the script executable
   chmod +x install-puppeteer-deps.sh

   # Run the installation script
   sudo ./install-puppeteer-deps.sh

   # Alternative: Run commands directly if script fails
   sudo apt-get update
   sudo apt-get install -y ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils libgbm-dev libxshmfence1
   ```

2. **Or manually install dependencies:**

   ```bash
   sudo apt-get update
   sudo apt-get install -y \
     ca-certificates fonts-liberation libappindicator3-1 libasound2 \
     libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 \
     libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 \
     libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 \
     libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 \
     libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 \
     libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
     libxtst6 lsb-release wget xdg-utils libgbm-dev libxshmfence1
   ```

3. **Restart your Node.js application:**
   ```bash
   pm2 restart lingua
   # or
   sudo systemctl restart your-app-service
   ```

### Option 2: Docker Deployment

1. **Add the contents of `dockerfile-puppeteer.txt` to your Dockerfile**

2. **Rebuild your Docker container:**
   ```bash
   docker build -t your-app .
   docker run -d --name your-app-container your-app
   ```

### Option 3: Environment Variables (Advanced)

Set custom Chrome executable path if you have Chrome installed elsewhere:

```bash
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome
# or
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
```

## Testing After Deployment

1. **Check if the PDF generation endpoint works:**

   ```bash
   curl -X POST "https://your-server.com/api/booking?key=TEST_BOOKING_ID"
   ```

2. **Monitor logs for successful PDF generation:**
   ```bash
   pm2 logs lingua
   # Look for: "✅ PDF generated successfully"
   ```

## Fallback Mechanism

The code now includes automatic fallback:

- ✅ **Primary**: Beautiful styled PDF (if all dependencies work)
- 🔄 **Fallback**: Simple but functional PDF (if Chrome has issues)
- ❌ **Error**: Clear error logging for debugging

## Common Issues & Solutions

### Issue: "libatk-1.0.so.0: cannot open shared object file"

**Solution**: Install missing dependencies using Option 1 above

### Issue: "Failed to launch browser process"

**Solution**:

1. Check if running as root (not recommended)
2. Install dependencies
3. Use Docker with proper user setup

### Issue: "Protocol error: Connection closed"

**Solution**: Increase memory limits or use `--single-process` flag (already included)

## Memory Optimization

If you have limited server resources, consider:

1. Using the fallback PDF (simpler styling)
2. Setting memory limits in PM2 configuration
3. Using `--single-process` flag (already included)

## Support

- Check logs: `pm2 logs lingua`
- Test locally first: `node test_pdf.js`
- Monitor server resources during PDF generation
