import { IApp } from './IApp';
import { ILogger } from '../logger/ILogger';

export interface AppArgs {
  logger: ILogger;
}

export class App implements IApp {
  private readonly logger: ILogger;

  constructor(args: AppArgs) {
    this.logger = args.logger;
  }

  async start(): Promise<void> {
    this.logger.info('App started!');
  }

  async stop(): Promise<void> {
    this.logger.info('App stopped!');
  }
}
