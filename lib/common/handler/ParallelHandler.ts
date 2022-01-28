import { Logger } from '../../logger/Logger';
import { Handler } from './Handler';
import { NestedHandler } from './NestedHandler';

export interface ParallelHandlerArgs<TIn, TOut> {
  logger: Logger;
  handlers: Handler<TIn, TOut>[];
}

export class ParallelHandler<TIn> extends NestedHandler<TIn, void> {
  constructor(args: ParallelHandlerArgs<TIn, void>) {
    super({ logger: args.logger, handlers: args.handlers });
  }

  async handle(input: TIn): Promise<void> {
    await Promise.all(this.handlers.filter((handler) => handler.canHandle(input))
      .map((handler) => handler.handle(input)));
  }
}
