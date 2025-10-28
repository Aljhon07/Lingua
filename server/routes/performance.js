const router = require("express").Router();
const fs = require("fs").promises;
const path = require("path");

const PERF_LOG_FILE = path.join(__dirname, "../logs/performance.log");

// Ensure logs directory exists
const ensureLogsDir = async () => {
  const logsDir = path.dirname(PERF_LOG_FILE);
  try {
    await fs.access(logsDir);
  } catch {
    await fs.mkdir(logsDir, { recursive: true });
  }
};

router.post("/log", async (req, res) => {
  try {
    const { type, duration, device, environment, timestamp } = req.body;

    const logEntry = {
      type,
      duration,
      device,
      timestamp: timestamp || new Date().toISOString(),
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    };

    // Ensure logs directory exists
    await ensureLogsDir();

    // Append to log file
    const logLine = JSON.stringify(logEntry) + "\n";
    await fs.appendFile(PERF_LOG_FILE, logLine);

    console.log("📊 Performance logged:", logEntry);
    res.status(200).json({ message: "Performance logged successfully" });
  } catch (error) {
    console.error("Error logging performance:", error);
    res.status(500).json({ error: "Failed to log performance" });
  }
});

module.exports = router;
