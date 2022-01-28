import { Logger } from '../../logger/Logger';
import { Handler } from './Handler';
import { NestedHandler } from './NestedHandler';

export interface SequenceHandlerArgs<TIn, TOut> {
  logger: Logger;
  handlers: Handler<TIn, TOut>[];
}

export class SequenceHandler<TIn> extends NestedHandler<TIn, void> {
  constructor(args: SequenceHandlerArgs<TIn, void>) {
    super({ logger: args.logger, handlers: args.handlers });
  }

  async handle(input: TIn): Promise<void> {
    const handlers = this.handlers.filter((handler) => handler.canHandle(input));
    for (const handler of handlers) {
      // eslint-disable-next-line no-await-in-loop
      await handler.handle(input);
    }
  }
}
