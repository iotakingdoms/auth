import { IncomingMessage } from 'http';
import { Handler } from '../common/handler/Handler';
import { WaterfallHandler } from '../common/handler/WaterfallHandler';
import { Logger, LogLevel } from '../logger/Logger';

export interface HttpHandlerInput {
  request: any;
  response: any;
}

export interface HttpHandlerArgs {
  logger: Logger;
  handlers: Handler<HttpHandlerInput, void>[];
  path: string;
}

export class HttpHandler extends WaterfallHandler<HttpHandlerInput> {
  private readonly path: string;

  constructor(args: HttpHandlerArgs) {
    super({ logger: args.logger, handlers: args.handlers });
    this.path = args.path;
  }

  canHandle(input: HttpHandlerInput): boolean {
    const request = input.request as IncomingMessage;
    if (!request.url) return false;
    if (this.path === '/') return true;
    if (this.path !== `/${request.url.split('/')[1]}`) return false;
    return this.handlers.some((handler) => handler.canHandle(input));
  }

  async handle(input: HttpHandlerInput): Promise<void> {
    const request = input.request as IncomingMessage;

    if (!request.url) return;

    if (this.path !== '/') {
      if (`/${request.url.split('/')[1]}` !== this.path) {
        return;
      }

      request.url = request.url.slice(this.path.length);
    }

    const newInput = { request, response: input.response };

    const handlers = this.handlers.filter((handler) => handler.canHandle(newInput));
    if (handlers[0]) {
      handlers[0].handle(newInput);
    }
  }
}
