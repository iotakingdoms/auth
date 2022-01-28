import {
  collectDefaultMetrics,
  Registry,
} from 'prom-client';
import { ServerResponse } from 'http';
import { Handler } from '../common/handler/Handler';
import { Logger, LogLevel } from '../logger/Logger';
import { HttpHandlerInput } from '../http/HttpHandler';

export interface PrometheusEndpointArgs {
  logger: Logger;
}

export class PrometheusEndpoint implements Handler<HttpHandlerInput, void> {
  private readonly logger: Logger;

  private readonly registry: Registry;

  constructor(args: PrometheusEndpointArgs) {
    this.logger = args.logger;
    this.registry = new Registry();
  }

  async initialize(): Promise<void> {
    this.registry.setDefaultLabels({
      app: process.env.npm_package_name,
    });

    collectDefaultMetrics({ register: this.registry });

    this.logger.log(LogLevel.Info, 'Initialized PrometheusEndpoint');
  }

  async terminate(): Promise<void> {
    this.registry.clear();
    this.logger.log(LogLevel.Info, 'Terminated PrometheusEndpoint');
  }

  canHandle(input: HttpHandlerInput): boolean {
    return true;
  }

  async handle(input: HttpHandlerInput): Promise<void> {
    const response = input.response as ServerResponse;
    response.setHeader('Content-Type', this.registry.contentType);
    response.end(await this.registry.metrics());
  }
}
