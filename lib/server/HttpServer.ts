import { Server, createServer } from 'http';
import { HttpHandler } from './HttpHandler';
import { ILogger, LogLevel } from '../logger/ILogger';
import { IServer } from './IServer';
import { Request } from './Request';
import { Response } from './Response';

export interface HttpServerArgs {
  logger: ILogger;
  port: number;
  middlewares: HttpHandler[];
}

export class HttpServer implements IServer {
  private readonly logger: ILogger;

  private readonly port: number;

  private readonly middlewares: HttpHandler[];

  private server: Server | undefined;

  constructor(args: HttpServerArgs) {
    this.logger = args.logger;
    this.port = args.port;
    this.middlewares = args.middlewares;

    this.invokeMiddlewares = this.invokeMiddlewares.bind(this);
  }

  async start(): Promise<void> {
    await Promise.all(this.middlewares.map((middleware) => middleware.initialize()));

    return new Promise((resolve) => {
      this.server = createServer(this.invokeMiddlewares);
      this.server.listen(this.port, () => {
        this.logger.log(LogLevel.Info, `Http server started on port: ${this.port}.`);
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    await Promise.all(this.middlewares.map((middleware) => middleware.terminate()));

    return new Promise((resolve, reject) => {
      if (!this.server) {
        this.logger.log(LogLevel.Info, 'Failed to stop http server, error: No server');
        reject(new Error('Failed to stop http server, error: No server'));
        return;
      }

      this.server.close((err?: Error) => {
        if (err) {
          this.logger.log(LogLevel.Info, `Failed to stop http server, error: ${err}`);
          reject(new Error(`Failed to stop http server, error: ${err}`));
          return;
        }

        this.logger.log(LogLevel.Info, 'Http server stopped.');
        resolve();
      });
    });
  }

  async invokeMiddlewares(request: Request, response: Response): Promise<void> {
    // eslint-disable-next-line no-restricted-syntax
    for (const middleware of this.middlewares) {
      // eslint-disable-next-line no-await-in-loop
      const output = await middleware.handle({ request, response });
      if (output.swallowed) break;
    }
  }
}
