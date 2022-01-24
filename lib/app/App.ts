import { IApp } from './IApp';
import { ILogger, LogLevel } from '../logger/ILogger';
import { IServer } from '../server/IServer';

export interface AppArgs {
  logger: ILogger;
  server: IServer;
}

export class App implements IApp {
  private readonly logger: ILogger;

  private readonly server: IServer;

  constructor(args: AppArgs) {
    this.logger = args.logger;
    this.server = args.server;
  }

  async start(): Promise<void> {
    await this.server.start();
    this.logger.log(LogLevel.Info, 'App started!');
  }

  async stop(): Promise<void> {
    await this.server.stop();
    this.logger.log(LogLevel.Info, 'App stopped!');
  }
}
