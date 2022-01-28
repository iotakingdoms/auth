import { IHandler } from './IHandler';

export interface SequenceHandlerArgs<TIn, TOut> {
  handlers: IHandler<TIn, TOut>[];
}

export class SequenceHandler<TIn, TOut> implements IHandler<TIn, TOut[]> {
  private readonly handlers: IHandler<TIn, TOut>[];

  constructor(args: SequenceHandlerArgs<TIn, TOut>) {
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
