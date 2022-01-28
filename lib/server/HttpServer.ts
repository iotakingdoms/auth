import { Server, createServer } from 'http';
import { HttpHandler, HttpHandlerInput, HttpHandlerOutput } from './HttpHandler';
import { ILogger, LogLevel } from '../logger/ILogger';
import { IServer } from './IServer';
import { Request } from './Request';
import { Response } from './Response';
import { IHandler } from '../common/handler/IHandler';

export interface HttpServerArgs {
  logger: ILogger;
  port: number;
  handler: IHandler<HttpHandlerInput, HttpHandlerOutput>;
}

export class HttpServer implements IServer {
  private readonly logger: ILogger;

  private readonly port: number;

  private readonly handler: IHandler<HttpHandlerInput, HttpHandlerOutput>;

  private server: Server | undefined;

  constructor(args: HttpServerArgs) {
    this.logger = args.logger;
    this.port = args.port;
    this.handler = args.handler;

    this.invokeHandler = this.invokeHandler.bind(this);
  }

  async start(): Promise<void> {
    await this.handler.initialize();

    return new Promise((resolve) => {
      this.server = createServer(this.invokeHandler);
      this.server.listen(this.port, () => {
        this.logger.log(LogLevel.Info, `Http server started on port: ${this.port}.`);
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    await this.handler.terminate();

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

  async invokeHandler(request: Request, response: Response): Promise<void> {
    await this.handler.handle({ request, response });
  }
}
