export interface IHandler<TIn, TOut> {
  initialize(): Promise<void>;
  terminate(): Promise<void>;
  canHandle(input: TIn): boolean;
  handle(input: TIn): Promise<TOut>;
}
