import { Logger } from '../../logger/Logger';
import { Handler } from './Handler';
import { NestedHandler } from './NestedHandler';

export interface WaterfallHandlerArgs<TIn, TOut> {
  logger: Logger;
  handlers: Handler<TIn, TOut>[];
}

export class WaterfallHandler<TIn> extends NestedHandler<TIn, void> {
  constructor(args: WaterfallHandlerArgs<TIn, void>) {
    super({ logger: args.logger, handlers: args.handlers });
  }

  async handle(input: TIn): Promise<void> {
    const handlers = this.handlers.filter((handler) => handler.canHandle(input));
    if (handlers[0]) {
      await handlers[0].handle(input);
    }
  }
}
