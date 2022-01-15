import { ILogger } from './ILogger';

export type LEVEL = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'NONE';

const LEVEL_INT = new Map<LEVEL, number>([
  ['DEBUG', 0],
  ['INFO', 1],
  ['WARN', 2],
  ['ERROR', 3],
  ['NONE', 4],
]);

export interface ConsoleLoggerArgs {
  level: string;
}

export class ConsoleLogger implements ILogger {
  private readonly level: LEVEL;

  constructor(args: ConsoleLoggerArgs) {
    this.level = args.level as LEVEL;
  }

  debug(message: string) {
    this.log('DEBUG', message);
  }

  info(message: string) {
    this.log('INFO', message);
  }

  warn(message: string) {
    this.log('WARN', message);
  }

  error(message: string) {
    this.log('ERROR', message);
  }

  isSufficientLevel(level: LEVEL) {
    return (LEVEL_INT.get(this.level)! <= LEVEL_INT.get(level)!);
  }

  private log(level: LEVEL, message: string) {
    if (!this.isSufficientLevel(level)) return;
    // eslint-disable-next-line no-console
    console.log(`[${level}] ${message}`);
  }
}
