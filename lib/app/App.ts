import { Logger, LogLevel } from '../logger/Logger';
import { Initializable } from '../common/Initializable';

export interface AppArgs {
  logger: Logger;
  httpServer: Initializable;
}

export class App implements Initializable {
  private readonly logger: Logger;

  private readonly httpServer: Initializable;

  constructor(args: AppArgs) {
    this.logger = args.logger;
    this.httpServer = args.httpServer;
  }

  async initialize(): Promise<void> {
    await this.httpServer.initialize();
    this.logger.log(LogLevel.Info, 'App started!');
  }

  async terminate(): Promise<void> {
    await this.httpServer.terminate();
    this.logger.log(LogLevel.Info, 'App stopped!');
  }
}
