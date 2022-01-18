import { ILogger } from '../../logger/ILogger';
import { HttpHandler, HttpHandlerInput, HttpHandlerOutput } from '../HttpHandler';
import { Request } from '../Request';
// import { Response } from '../Response';

export interface RouteHandlerArgs {
  logger: ILogger;
  path: string;
  middlewares: HttpHandler[];
}

export class RouteHandler extends HttpHandler {
  private readonly logger: ILogger;

  private readonly path: string;

  private readonly middlewares: HttpHandler[];

  constructor(args: RouteHandlerArgs) {
    super();
    this.logger = args.logger;
    this.path = args.path;
    this.middlewares = args.middlewares;
  }

  async initialize(): Promise<void> {
    this.middlewares.forEach((middleware) => middleware.initialize());
    this.logger.info('Initialized RouteHandler');
  }

  async terminate(): Promise<void> {
    this.middlewares.forEach((middleware) => middleware.terminate());
    this.logger.info('Terminated RouteHandler');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canHandle(input: HttpHandlerInput): boolean {
    if (!input.request.url) return false;
    if (this.path === '/') return true;
    if (this.path !== `/${input.request.url.split('/')[1]}`) return false;
    return true;
  }

  async handle(input: HttpHandlerInput): Promise<HttpHandlerOutput> {
    const { request }: { request: Request } = input;

    if (!request.url) return { swallowed: false };

    if (this.path !== '/') {
      if (`/${request.url.split('/')[1]}` !== this.path) {
        return { swallowed: false };
      }

      request.url = request.url.slice(this.path.length);
    }

    const newInput = { request, response: input.response };

    // eslint-disable-next-line no-restricted-syntax
    for (const middleware of this.middlewares) {
      if (middleware.canHandle(newInput)) {
        // eslint-disable-next-line no-await-in-loop
        const output = await middleware.handle(newInput);
        if (output.swallowed) break;
      }
    }

    return { swallowed: true };
  }
}
