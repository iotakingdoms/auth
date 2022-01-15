import express, { Express } from 'express';
import { Server } from 'http';
import { collectDefaultMetrics, Registry } from 'prom-client';
import { ILogger } from '../logger/ILogger';
import { IServer } from './IServer';

export interface ExpressServerArgs {
  logger: ILogger;
  port: number;
}

export class ExpressServer implements IServer {
  private readonly logger: ILogger;

  private readonly port: number;

  private readonly app: Express;

  private server: Server | undefined;

  private readonly registry: Registry;

  constructor(args: ExpressServerArgs) {
    this.logger = args.logger;
    this.port = args.port;
    this.app = express();

    this.registry = new Registry();
  }

  async get(req: any, res: any) {
    this.logger.info('GET /');
    res.send('Hello from ExpressServer');
  }

  async getMetrics(req: any, res: any) {
    this.logger.info('GET /metrics');
    const metrics = await this.registry.metrics();
    res.json(metrics);
  }

  async start(): Promise<void> {
    this.registry.setDefaultLabels({
      app: process.env.npm_package_name,
    });

    collectDefaultMetrics({ register: this.registry });

    this.app.get('/', this.get);
    this.app.get('/metrics', this.getMetrics);

    return new Promise((resolve) => {
      this.server = this.app.listen(this.port, () => {
        this.logger.info(`Express server started on port: ${this.port}.`);
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    this.registry.clear();
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
}
