import { ServerResponse } from 'http';
import { ILogger, LogLevel } from '../../logger/ILogger';
import { HttpHandler, HttpHandlerInput, HttpHandlerOutput } from '../HttpHandler';

export interface VersionHandlerArgs {
  logger: ILogger;
}

export class VersionHandler extends HttpHandler {
  private readonly logger: ILogger;

  constructor(args: VersionHandlerArgs) {
    super();
    this.logger = args.logger;
  }

  async initialize(): Promise<void> {
    this.logger.log(LogLevel.Info, 'Initialized VersionHandler');
  }

  async terminate(): Promise<void> {
    this.logger.log(LogLevel.Info, 'Terminated VersionHandler');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canHandle(input: HttpHandlerInput): boolean {
    return true;
  }

  async handle(input: HttpHandlerInput): Promise<HttpHandlerOutput> {
    const serverResponse: ServerResponse = input.response;
    serverResponse.setHeader('Content-Type', 'text/plain');
    serverResponse.statusCode = 200;
    serverResponse.end('Version: ' + process.env.npm_package_version);

    return { swallowed: true };
  }
}
