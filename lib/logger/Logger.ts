export enum LogLevel {
  Debug,
  Info,
  Warn,
  Error,
  None,
}

export interface Logger {
  debug(message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  log(logLevel: LogLevel, message: string): void;
}
