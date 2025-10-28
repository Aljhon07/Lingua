import { server } from "@constants/api";
import * as Device from "expo-device";

export const PerfMonitor = {
  appStartTime: null,
  speechStartTime: null,

  initAppStart() {
    this.appStartTime = Date.now();
    console.log("📱 App start time recorded");
  },

  async logAppLoad() {
    if (!this.appStartTime) {
      console.warn(
        "⚠️ App start time not recorded - calling initAppStart first"
      );
      return;
    }
    const loadTime = Date.now() - this.appStartTime;
    console.log(`🚀 App Load Time: ${loadTime}ms`);
    await this.saveMetrics("App Load", loadTime);
  },

  startSpeech() {
    this.speechStartTime = Date.now();
  },

  async endSpeech() {
    if (!this.speechStartTime) return;
    const latency = Date.now() - this.speechStartTime;
    await this.saveMetrics("Speech Recognition", latency);
    this.speechStartTime = null;
  },

  async saveMetrics(type, duration) {
    const metric = {
      type,
      duration,
      timestamp: new Date().toISOString(),
      device: Device.modelName,
    };

    console.log(`📊 Saving metric:`, metric);

    try {
      // Send to server
      const response = await fetch(`${server.baseURL}/performance/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metric),
      });

      if (response.ok) {
        console.log("✅ Metric sent to server successfully");
      } else {
        console.error(`❌ Server responded with ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Failed to send to server:", error.message);
    }

    console.table([metric]);
  },
};
