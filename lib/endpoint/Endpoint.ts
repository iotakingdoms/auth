import { ServerResponse } from 'http';
import { Handler } from '../common/handler/Handler';
import { Logger, LogLevel } from '../logger/Logger';
import { HttpHandlerInput } from '../http/HttpHandler';
import { Initializer } from '../common/Initializer';

export interface EndpointArgs {
  logger: Logger;
}

export abstract class Endpoint extends Initializer implements Handler<HttpHandlerInput, void> {
  abstract canHandle(input: HttpHandlerInput): boolean;

  abstract handle(input: HttpHandlerInput): Promise<void>;
}
