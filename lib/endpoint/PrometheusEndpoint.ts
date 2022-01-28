import {
  collectDefaultMetrics,
  Registry,
} from 'prom-client';
import { ServerResponse } from 'http';
import { Logger, LogLevel } from '../logger/Logger';
import { HttpHandlerInput } from '../http/HttpHandler';
import { Endpoint } from './Endpoint';

export interface PrometheusEndpointArgs {
  logger: Logger;
}

export class PrometheusEndpoint extends Endpoint {
  private readonly registry: Registry;

  constructor(args: PrometheusEndpointArgs) {
    super({ logger: args.logger });
    this.registry = new Registry();
  }

  async initialize(): Promise<void> {
    await super.initialize();
    this.registry.setDefaultLabels({
      app: process.env.npm_package_name,
    });

    collectDefaultMetrics({ register: this.registry });
  }

  async terminate(): Promise<void> {
    await super.terminate();
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
