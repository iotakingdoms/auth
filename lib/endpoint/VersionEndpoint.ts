import { ServerResponse } from 'http';
import { Logger } from '../logger/Logger';
import { HttpHandlerInput } from '../http/HttpHandler';
import { Endpoint } from './Endpoint';

export interface VersionEndpointArgs {
  logger: Logger;
}

export class VersionEndpoint extends Endpoint {
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
