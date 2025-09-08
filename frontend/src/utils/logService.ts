import axios from "axios";

const LOG_API = "http://20.244.56.144/evaluation-service/logs";

export async function Log(
  stack: "frontend",
  level: "debug" | "info" | "warn" | "error" | "fatal",
  pkg:
    | "component"
    | "hook"
    | "page"
    | "api"
    | "state"
    | "style"
    | "auth"
    | "config"
    | "middleware"
    | "utils",
  message: string,
  token: string
) {
  try {
    await axios.post(
      LOG_API,
      { stack, level, package: pkg, message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    console.error("Frontend logging failed:", err);
  }
}
