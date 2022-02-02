import { Logger, Initializable } from '@iotakingdoms/common';

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
    this.logger.info('App started');
  }

  async terminate(): Promise<void> {
    await this.httpServer.terminate();
    this.logger.info('App terminated');
  }
}
