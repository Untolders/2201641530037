export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

export type BackendPackage =
  | "controller"
  | "service"
  | "model"
  | "route"
  | "middleware"
  | "utils";
