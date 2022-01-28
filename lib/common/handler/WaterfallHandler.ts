import { IHandler } from './IHandler';
import { NestedHandler } from './NestedHandler';

export interface WaterfallHandlerArgs<TIn, TOut> {
  handlers: IHandler<TIn, TOut>[];
}

export class WaterfallHandler<TIn, TOut> extends NestedHandler<TIn, TOut> {
  constructor(args: WaterfallHandlerArgs<TIn, TOut>) {
    super({ handlers: args.handlers });
  }

  async handle(input: TIn): Promise<TOut[]> {
    const handlers = this.handlers.filter((handler) => handler.canHandle(input));
    return handlers[0] ? [await handlers[0].handle(input)] : [];
  }
}
