import axios from "axios";

type Stack = "backend" | "frontend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";
type Package =
  | "cache" | "controller" | "cron_job" | "db" | "domain" | "handler"
  | "repository" | "route" | "service" // backend only
  | "api" | "component" | "hook" | "page" | "state" | "style" // frontend only
  | "auth" | "config" | "middleware" | "utils"; // both

interface LogBody {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

const LOG_API = "http://29.244.56.144/evaluation-service/logs";

export async function Log(stack: Stack, level: Level, pkg: Package, message: string) {
  const body: LogBody = { stack, level, package: pkg, message };

  try {
    const res = await axios.post(LOG_API, body, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Log created successfully:", res.data);
  } catch (err) {
    console.error("Failed to send log:", err);
  }
}
