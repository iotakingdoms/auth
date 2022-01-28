import {
  Server,
  createServer,
} from 'http';
import { Logger, LogLevel } from '../logger/Logger';
import { Handler } from '../common/handler/Handler';
import { HttpHandlerInput } from './HttpHandler';
import { Initializable } from '../common/Initializable';

export interface HttpServerArgs {
  logger: Logger;
  port: number;
  handler: Handler<HttpHandlerInput, void>;
}

export class HttpServer implements Initializable {
  private readonly logger: Logger;

  private readonly port: number;

  private readonly handler: Handler<HttpHandlerInput, void>;

  private server: Server | undefined;

  constructor(args: HttpServerArgs) {
    this.logger = args.logger;
    this.port = args.port;
    this.handler = args.handler;

    this.invokeHandler = this.invokeHandler.bind(this);
  }

  async initialize(): Promise<void> {
    await this.handler.initialize();

    return new Promise((resolve) => {
      this.server = createServer(this.invokeHandler);
      this.server.listen(this.port, () => {
        this.logger.log(LogLevel.Info, `Http server started on port: ${this.port}.`);
        resolve();
      });
    });
  }

  async terminate(): Promise<void> {
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

  async invokeHandler(req: any, res: any): Promise<void> {
    const input: HttpHandlerInput = { request: req, response: res };
    await this.handler.handle(input);
  }
}
