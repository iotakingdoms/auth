import { Initializable } from '../Initializable';

export interface Handler<TIn, TOut> extends Initializable {
  canHandle(input: TIn): boolean;
  handle(input: TIn): Promise<TOut>;
}
