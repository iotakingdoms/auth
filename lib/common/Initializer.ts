import { Logger, LogLevel } from '../logger/Logger';
import { Initializable } from './Initializable';

export interface InitializerArgs {
  logger: Logger;
}

export class Initializer implements Initializable {
  protected readonly logger: Logger;

  constructor(args: InitializerArgs) {
    this.logger = args.logger;
  }

  async initialize(): Promise<void> {
    this.logger.log(LogLevel.Info, `Initializing ${this.constructor.name}...`);
  }

  async terminate(): Promise<void> {
    this.logger.log(LogLevel.Info, `Terminating ${this.constructor.name}...`);
  }
}
