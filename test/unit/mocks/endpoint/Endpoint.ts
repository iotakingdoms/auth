import { Handler } from '../../../../lib/common/handler/Handler';
import { HttpHandlerInput } from '../../../../lib/http/HttpHandler';

export const mockEndpoint = (): jest.Mocked<Handler<HttpHandlerInput, void>> => ({
  initialize: jest.fn(),
  terminate: jest.fn(),
  canHandle: jest.fn((input: HttpHandlerInput) => true),
  handle: jest.fn(async (input: HttpHandlerInput) => {}),
});
