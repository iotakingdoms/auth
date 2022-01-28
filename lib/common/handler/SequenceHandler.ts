import { IHandler } from './IHandler';
import { NestedHandler } from './NestedHandler';

export interface SequenceHandlerArgs<TIn, TOut> {
  handlers: IHandler<TIn, TOut>[];
}

export class SequenceHandler<TIn, TOut> extends NestedHandler<TIn, TOut> {
  constructor(args: SequenceHandlerArgs<TIn, TOut>) {
    super({ handlers: args.handlers });
  }

  async handle(input: TIn): Promise<TOut[]> {
    const handlers = this.handlers.filter((handler) => handler.canHandle(input));
    const output: TOut[] = [];
    for (const handler of handlers) {
      // eslint-disable-next-line no-await-in-loop
      output.push(await handler.handle(input));
    }
    return output;
  }
}
