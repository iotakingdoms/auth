import { ServerResponse } from 'http';
import { Handler } from '../common/handler/Handler';
import { Logger, LogLevel } from '../logger/Logger';
import { HttpHandlerInput } from '../http/HttpHandler';

export interface NotFoundEndpointArgs {
  logger: Logger;
}

export class NotFoundEndpoint implements Handler<HttpHandlerInput, void> {
  private readonly logger: Logger;

  constructor(args: NotFoundEndpointArgs) {
    this.logger = args.logger;
  }

  async initialize(): Promise<void> {
    this.logger.log(LogLevel.Info, 'Initialized NotFoundEndpoint');
  }

  async terminate(): Promise<void> {
    this.logger.log(LogLevel.Info, 'Terminated NotFoundEndpoint');
  }

  canHandle(input: HttpHandlerInput): boolean {
    return true;
  }

  async handle(input: HttpHandlerInput): Promise<void> {
    const response = input.response as ServerResponse;
    response.setHeader('Content-Type', 'text/plain');
    response.statusCode = 404;
    response.end('Not found');
  }
}
