import { ConsoleLogger, HttpServer, Initializable } from '@iotakingdoms/common';

export interface AppArgs {
  logger: ConsoleLogger;
  httpServer: HttpServer;
}

export class App implements Initializable {
  private readonly logger: ConsoleLogger;

  private readonly httpServer: HttpServer;

  constructor(args: AppArgs) {
    this.logger = args.logger;
    this.httpServer = args.httpServer;
  }

  async initialize(): Promise<void> {
    await this.httpServer.initialize();
    this.logger.info('App started');
  }

  async terminate(): Promise<void> {
    await this.httpServer.terminate();
    this.logger.info('App terminated');
  }
}
