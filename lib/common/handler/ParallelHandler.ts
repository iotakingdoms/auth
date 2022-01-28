import { IHandler } from './IHandler';
import { NestedHandler } from './NestedHandler';

export interface ParallelHandlerArgs<TIn, TOut> {
  handlers: IHandler<TIn, TOut>[];
}

export class ParallelHandler<TIn, TOut> extends NestedHandler<TIn, TOut> {
  constructor(args: ParallelHandlerArgs<TIn, TOut>) {
    super({ handlers: args.handlers });
  }

  async handle(input: TIn): Promise<TOut[]> {
    return Promise.all(this.handlers.filter((handler) => handler.canHandle(input))
      .map((handler) => handler.handle(input)));
  }
}
