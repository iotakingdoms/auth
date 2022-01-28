import { ServerResponse } from 'http';
import { Handler } from '../common/handler/Handler';
import { Logger, LogLevel } from '../logger/Logger';
import { HttpHandlerInput } from '../http/HttpHandler';

export interface VersionEndpointArgs {
  logger: Logger;
}

export class VersionEndpoint implements Handler<HttpHandlerInput, void> {
  private readonly logger: Logger;

  constructor(args: VersionEndpointArgs) {
    this.logger = args.logger;
  }

  async initialize(): Promise<void> {
    this.logger.log(LogLevel.Info, 'Initialized VersionEndpoint');
  }

  async terminate(): Promise<void> {
    this.logger.log(LogLevel.Info, 'Terminated VersionEndpoint');
  }

  canHandle(input: HttpHandlerInput): boolean {
    return true;
  }

  async handle(input: HttpHandlerInput): Promise<void> {
    const response = input.response as ServerResponse;
    response.setHeader('Content-Type', 'text/plain');
    response.statusCode = 200;
    response.end(`Version: ${process.env.npm_package_version}`);
  }
}
