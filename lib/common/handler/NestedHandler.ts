import { IHandler } from './IHandler';

export interface NestedHandlerArgs<TIn, TOut> {
  handlers: IHandler<TIn, TOut>[];
}

export abstract class NestedHandler<TIn, TOut> implements IHandler<TIn, TOut[]> {
  protected readonly handlers: IHandler<TIn, TOut>[];

  constructor(args: NestedHandlerArgs<TIn, TOut>) {
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

  abstract handle(input: TIn): Promise<TOut[]>;
}
