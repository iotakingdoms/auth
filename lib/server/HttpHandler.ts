import { IHandler } from '../handler/IHandler';
import { Request } from './Request';
import { Response } from './Response';

export interface HttpHandlerInput {
  request: Request;
  response: Response;
}

export interface HttpHandlerOutput {
  swallowed: boolean;
}

export abstract class HttpHandler implements IHandler<HttpHandlerInput, HttpHandlerOutput> {
  abstract initialize(): Promise<void>;

  abstract terminate(): Promise<void>;

  abstract canHandle(input: HttpHandlerInput): boolean;

  abstract handle(input: HttpHandlerInput): Promise<HttpHandlerOutput>;
}
