import {
  collectDefaultMetrics,
  Registry,
} from 'prom-client';
import { ServerResponse } from 'http';
import { ILogger } from '../../logger/ILogger';
import { HttpHandler, HttpHandlerInput, HttpHandlerOutput } from '../HttpHandler';

export interface PrometheusHandlerArgs {
  logger: ILogger;
}

export class PrometheusHandler extends HttpHandler {
  private readonly logger: ILogger;

  private readonly registry: Registry;

  constructor(args: PrometheusHandlerArgs) {
    super();
    this.logger = args.logger;
    this.registry = new Registry();
  }

  async initialize(): Promise<void> {
    this.registry.setDefaultLabels({
      app: process.env.npm_package_name,
    });

    collectDefaultMetrics({ register: this.registry });

    this.logger.info('Initialized MetricsMiddleware');
  }

  async terminate(): Promise<void> {
    this.registry.clear();
    this.logger.info('Terminated MetricsMiddleware');
  }

  canHandle(input: HttpHandlerInput): boolean {
    if (input.request.method !== 'GET') return false;
    if (input.request.url !== '/metrics') return false;
    return true;
  }

  async handle(input: HttpHandlerInput): Promise<HttpHandlerOutput> {
    if (!this.canHandle(input)) {
      this.logger.warn('This middleware received an unsupported handle request!');
      return { swallowed: false };
    }

    const serverResponse: ServerResponse = input.response;
    serverResponse.setHeader('Content-Type', this.registry.contentType);
    serverResponse.end(await this.registry.metrics());

    return { swallowed: true };
  }
}
