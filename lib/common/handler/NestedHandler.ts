import { Logger } from '../../logger/Logger';
import { Initializer } from '../Initializer';
import { Handler } from './Handler';

export interface NestedHandlerArgs<TIn, TOut> {
  logger: Logger;
  handlers: Handler<TIn, TOut>[];
}

export abstract class NestedHandler<TIn, TOut> extends Initializer implements Handler<TIn, TOut> {
  protected readonly handlers: Handler<TIn, TOut>[];

  constructor(args: NestedHandlerArgs<TIn, TOut>) {
    super({ logger: args.logger });
    this.handlers = args.handlers;
  }

  async initialize(): Promise<void> {
    await Promise.all(this.handlers.map(async (handler) => handler.initialize()));
  }

  async terminate(): Promise<void> {
    await Promise.all(this.handlers.map(async (handler) => handler.terminate()));
  }

  canHandle(input: TIn): boolean {
    return this.handlers.map((handler) => handler.canHandle(input)).some((canHandle) => canHandle);
  }

  abstract handle(input: TIn): Promise<TOut>;
}
