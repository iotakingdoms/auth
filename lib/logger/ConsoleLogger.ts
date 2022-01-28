import { Logger, LogLevel } from './Logger';

export interface ConsoleLoggerArgs {
  logLevel: string;
}

export class ConsoleLogger implements Logger {
  private readonly logLevel: LogLevel;

  constructor(args: ConsoleLoggerArgs) {
    this.logLevel = LogLevel[args.logLevel as keyof typeof LogLevel];
  }

  debug(message: string) {
    this.log(LogLevel.Debug, message);
  }

  info(message: string) {
    this.log(LogLevel.Info, message);
  }

  warn(message: string) {
    this.log(LogLevel.Warn, message);
  }

  error(message: string) {
    this.log(LogLevel.Error, message);
  }

  isSufficientLogLevel(logLevel: LogLevel) {
    return this.logLevel <= logLevel;
  }

  log(logLevel: LogLevel, message: string) {
    if (!this.isSufficientLogLevel(logLevel)) return;
    // eslint-disable-next-line no-console
    console.log(`[${LogLevel[logLevel].toUpperCase()}] ${message}`);
  }
}
