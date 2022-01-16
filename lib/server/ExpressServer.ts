import express, { Express } from 'express';
import { Server } from 'http';
import { HttpHandler } from './HttpHandler';
import { ILogger } from '../logger/ILogger';
import { IServer } from './IServer';
import { Request } from './Request';
import { Response } from './Response';

export interface ExpressServerArgs {
  logger: ILogger;
  port: number;
  middlewares: HttpHandler[];
}

export class ExpressServer implements IServer {
  private readonly logger: ILogger;

  private readonly port: number;

  private readonly middlewares: HttpHandler[];

  private readonly app: Express;

  private server: Server | undefined;

  constructor(args: ExpressServerArgs) {
    this.logger = args.logger;
    this.port = args.port;
    this.middlewares = args.middlewares;
    this.app = express();

    this.invokeMiddlewares = this.invokeMiddlewares.bind(this);
  }

  async start(): Promise<void> {
    await Promise.all(this.middlewares.map((middleware) => middleware.initialize()));

    this.app.use(this.invokeMiddlewares);

    return new Promise((resolve) => {
      this.server = this.app.listen(this.port, () => {
        this.logger.info(`Express server started on port: ${this.port}.`);
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    await Promise.all(this.middlewares.map((middleware) => middleware.terminate()));

    return new Promise((resolve, reject) => {
      if (!this.server) {
        this.logger.info('Failed to stop express server, error: No server');
        reject(new Error('Failed to stop express server, error: No server'));
        return;
      }

      this.server.close((err?: Error) => {
        if (err) {
          this.logger.info(`Failed to stop express server, error: ${err}`);
          reject(new Error(`Failed to stop express server, error: ${err}`));
          return;
        }

        this.logger.info('Express stopped.');
        resolve();
      });
    });
  }

  async invokeMiddlewares(request: Request, response: Response): Promise<void> {
    for (let i = 0; i < this.middlewares.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const output = await this.middlewares[i].handle({ request, response });
      if (output.swallowed) break;
    }
  }
}
