import { IInitializable } from './IInitializable';

export interface IHandler<TIn, TOut> extends IInitializable {
  canHandle(input: TIn): boolean;
  handle(input: TIn): Promise<TOut>;
}
