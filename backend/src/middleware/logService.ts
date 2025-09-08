import fs from "fs";
import path from "path";

const logDir = path.join(__dirname, "../../logs");

// Ensure logs folder exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

/**
 * Log messages to console + file
 * @param level "info" | "error"
 * @param source Where the log came from (route, controller, etc.)
 * @param message What happened
 */
export async function Log(level: "info" | "error", source: string, message: string) {
  const logMessage = `[${new Date().toISOString()}] [${level.toUpperCase()}] [${source}] ${message}\n`;

  // Write to console
  if (level === "error") {
    console.error(logMessage);
  } else {
    console.log(logMessage);
  }

  // Append to log file
  const logFile = path.join(logDir, `${level}.log`);
  fs.appendFileSync(logFile, logMessage);
}
